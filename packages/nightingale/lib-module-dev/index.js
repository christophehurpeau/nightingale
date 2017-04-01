import Logger from 'nightingale-logger';

import t from 'flow-runtime';
export default Logger;
export { configure, addConfig } from './config';
import _levels from 'nightingale-levels';
export { _levels as levels };

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */

export function listenUnhandledErrors(logger) {
  var _loggerType = t.nullable(t.ref(Logger));

  t.param('logger', _loggerType).assert(logger);

  if (!logger) logger = _loggerType.assert(new Logger('nightingale.listenUnhandledErrors', 'listenUnhandledErrors'));
  process.on('uncaughtException', function (err) {
    return logger.error('uncaughtException', { err: err });
  });
  process.on('unhandledRejection', function (err) {
    return logger.error('unhandledRejection', { err: err });
  });
}
//# sourceMappingURL=index.js.map