import Logger from 'nightingale-logger';
import Level from 'nightingale-levels';

export default Logger;
export { configure, addConfig } from './config';
export { Level, Level as levels };

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */
export function listenUnhandledErrors(
  logger: Logger = new Logger('nightingale.listenUnhandledErrors', 'listenUnhandledErrors'),
) {
  process.on('uncaughtException', err => logger.error('uncaughtException', { err }));
  process.on('unhandledRejection', err => logger.error('unhandledRejection', { err }));
}
