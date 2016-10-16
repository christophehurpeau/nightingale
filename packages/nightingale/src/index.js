import Logger from 'nightingale-logger/src';

export default Logger;
export { configure, addConfig } from './config';
export levels from 'nightingale-levels';

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */
export function listenUnhandledErrors(logger: ?Logger) {
  if (!logger) logger = new Logger('nightingale.listenUnhandledErrors', 'listenUnhandledErrors');
  process.on('uncaughtException', err => logger.error('uncaughtException', { err }));
  process.on('unhandledRejection', err => logger.error('unhandledRejection', { err }));
}
