import Logger from 'nightingale-logger';

export default Logger;
export { configure, addConfig } from './config';
import _levels from 'nightingale-levels';
export { _levels as levels };

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */

export function listenUnhandledErrors(logger) {
  if (!logger) logger = new Logger('nightingale.listenUnhandledErrors', 'listenUnhandledErrors');
  process.on('uncaughtException', function (err) {
    return logger.error('uncaughtException', { err });
  });
  process.on('unhandledRejection', function (err) {
    return logger.error('unhandledRejection', { err });
  });
}
//# sourceMappingURL=index.js.map