import {createClient} from 'redis';
import {getLogger} from '../logger';
import {GracefulShutdown} from 'graceful-sd';
import {cache_config} from './config';
import {sleep} from '../util';

const log = getLogger('Cache');

log.info(`initializing connection to cache...`);
const client = createClient(cache_config);
client.on('error', (err) => log.error(err));
client.connect();
GracefulShutdown.Instance.registerAfterServerShutdownCallback(async () => {
  log.info('Disconnecting from cache...');
  await client.quit();
  log.info('Disconnected from cache.');
});

export {client as Cache};

/**
 * Waits for the cache connection to be established and returns.
 * If the cache connection isn't established in some amount of time then an exception is thrown.
 */
export async function waitForCacheConnection() {
  let i = 0;
  const waitMs = 10;
  while (!client.isReady && i < 10) {
    await sleep(waitMs);
    i++;
  }
  if (client.isReady) return true;
  else
    throw Error(
      `The cache connection wasn't ready in ${i * waitMs} milliseconds`
    );
}
