import pino from 'pino';

const logger = pino();

/**
 * Get a logger for this module.
 */
function getLogger(module: string) {
  return logger.child({module: module});
}

export {getLogger};
