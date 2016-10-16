'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levels = exports.addConfig = exports.configure = undefined;

var _config = require('./config');

Object.defineProperty(exports, 'configure', {
  enumerable: true,
  get: function get() {
    return _config.configure;
  }
});
Object.defineProperty(exports, 'addConfig', {
  enumerable: true,
  get: function get() {
    return _config.addConfig;
  }
});
exports.listenUnhandledErrors = listenUnhandledErrors;

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _nightingaleLogger = require('nightingale-logger');

var _nightingaleLogger2 = _interopRequireDefault(_nightingaleLogger);

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _nightingaleLogger2.default;
exports.levels = _nightingaleLevels2.default;

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */

function listenUnhandledErrors(logger) {
  _assert(logger, _tcombForked2.default.maybe(_nightingaleLogger2.default), 'logger');

  if (!logger) logger = new _nightingaleLogger2.default('nightingale.listenUnhandledErrors', 'listenUnhandledErrors');
  process.on('uncaughtException', err => logger.error('uncaughtException', { err }));
  process.on('unhandledRejection', err => logger.error('unhandledRejection', { err }));
}

function _assert(x, type, name) {
  function message() {
    return 'Invalid value ' + _tcombForked2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcombForked2.default.getTypeName(type) + ')';
  }

  if (_tcombForked2.default.isType(type)) {
    if (!type.is(x)) {
      type(x, [name + ': ' + _tcombForked2.default.getTypeName(type)]);

      _tcombForked2.default.fail(message());
    }
  } else if (!(x instanceof type)) {
    _tcombForked2.default.fail(message());
  }

  return x;
}
//# sourceMappingURL=index.js.map