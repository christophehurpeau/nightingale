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
  if (!logger) logger = new Logger('nightingale.listenUnhandledErrors', 'listenUnhandledErrors');
  process.on('uncaughtException', err => {
    return logger.error('uncaughtException', { err });
  });
  process.on('unhandledRejection', err => {
    return logger.error('unhandledRejection', { err });
  });
}
//# sourceMappingURL=index.js.map