import {
  DocumentClient,
  waitForDocumentDatabaseConnection,
} from './documentDB/documentClient';
import {getLogger} from './logger';
import {sleep} from './util';

const log = getLogger('main');

function hello() {
  log.info('Hello, World!');
}
hello();

// ======================================
//    top level async/await example

async function slowHello() {
  log.info('Slow Hello: waiting 5 seconds before saying hello...');
  await sleep(5000);
  log.info('Heeeeelllllllooooooo');
}

(async () => {
  try {
    await slowHello();
  } catch (e) {
    // https://stackoverflow.com/a/46515787/2155085
    log.error('An error happened in the top level async/await call: ', e);
  }
})();

// ======================================
