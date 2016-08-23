import Logger from 'nightingale-logger';

import _default from 'nightingale-logger';
export { _default as default };

export { configure, addConfig, addGlobalProcessor, addGlobalHandler } from './config';
export { default as levels } from 'nightingale-levels';

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */
export function listenUnhandledErrors(logger) {
  if (!logger) logger = new Logger();
  process.on('uncaughtException', function (err) {
    return logger.error('uncaughtException', { err: err });
  });
  process.on('unhandledRejection', function (err) {
    return logger.error('unhandledRejection', { err: err });
  });
}
//# sourceMappingURL=index.js.map