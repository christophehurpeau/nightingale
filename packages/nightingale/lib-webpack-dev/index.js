import _t from 'tcomb-forked';
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
  _assert(logger, _t.maybe(Logger), 'logger');

  if (!logger) logger = new Logger('nightingale.listenUnhandledErrors', 'listenUnhandledErrors');
  process.on('uncaughtException', function (err) {
    return logger.error('uncaughtException', { err: err });
  });
  process.on('unhandledRejection', function (err) {
    return logger.error('unhandledRejection', { err: err });
  });
}

function _assert(x, type, name) {
  function message() {
    return 'Invalid value ' + _t.stringify(x) + ' supplied to ' + name + ' (expected a ' + _t.getTypeName(type) + ')';
  }

  if (_t.isType(type)) {
    if (!type.is(x)) {
      type(x, [name + ': ' + _t.getTypeName(type)]);

      _t.fail(message());
    }
  } else if (!(x instanceof type)) {
    _t.fail(message());
  }

  return x;
}
//# sourceMappingURL=index.js.map