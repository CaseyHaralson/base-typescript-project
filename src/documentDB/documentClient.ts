import {GracefulShutdown} from 'graceful-sd';
import {getLogger} from '../logger';
import {client} from './config';
import {sleep} from '../util';

const log = getLogger('DocumentClient');

let dbConnected = false;

log.info(`initializing connection to document database...`);
client
  .connect()
  .then(() => {
    dbConnected = true;
    log.info(`document database connection initialized`);
  })
  .catch((e) => {
    log.info(`document database connection initialization error: ${e}`);
  });
GracefulShutdown.Instance.registerAfterServerShutdownCallback(async () => {
  log.info('closing document database connections...');
  // no longer have access to "isConnected" property so just close the connection
  await client.close();
  log.info('document database connections closed');
});

export {client as DocumentClient};

/**
 * Waits for the database connection to be established and returns.
 * If the database connection isn't established in some amount of time then an exception is thrown.
 */
export async function waitForDocumentDatabaseConnection() {
  let i = 0;
  const waitMs = 10;
  while (!dbConnected && i < 10) {
    await sleep(waitMs);
    i++;
  }
  if (dbConnected) return true;
  else
    throw Error(
      `The document database connection wasn't ready in ${
        i * waitMs
      } milliseconds`
    );
}
