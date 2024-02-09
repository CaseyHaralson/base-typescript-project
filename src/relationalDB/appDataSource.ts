import {GracefulShutdown} from 'graceful-sd';
import {db_config} from './config';
import {getLogger} from '../logger';
import {sleep} from '../util';

const log = getLogger('AppDataSource');

log.info(`initializing connection to relational database...`);
db_config
  .initialize()
  .then(() => {
    log.info(`relational database connection initialized`);
  })
  .catch((e) =>
    log.info(`relational database connection initialization error: ${e}`)
  );
GracefulShutdown.Instance.registerAfterServerShutdownCallback(async () => {
  log.info('closing relational database connections...');
  if (db_config.isInitialized) await db_config.destroy();
  log.info('relational database connections closed');
});

export {db_config as AppDataSource};

/**
 * Waits for the database connection to be established and returns.
 * If the database connection isn't established in some amount of time then an exception is thrown.
 */
export async function waitForRelationalDatabaseConnection() {
  let i = 0;
  const waitMs = 10;
  while (!db_config.isInitialized && i < 10) {
    await sleep(waitMs);
    i++;
  }
  if (db_config.isInitialized) return true;
  else
    throw Error(
      `The relational database connection wasn't ready in ${
        i * waitMs
      } milliseconds`
    );
}
