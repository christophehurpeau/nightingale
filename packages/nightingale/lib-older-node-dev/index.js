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

var _nightingaleLogger = require('nightingale-logger');

var _nightingaleLogger2 = _interopRequireDefault(_nightingaleLogger);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

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
  var _loggerType = _flowRuntime2.default.nullable(_flowRuntime2.default.ref(_nightingaleLogger2.default));

  _flowRuntime2.default.param('logger', _loggerType).assert(logger);

  if (!logger) logger = _loggerType.assert(new _nightingaleLogger2.default('nightingale.listenUnhandledErrors', 'listenUnhandledErrors'));
  process.on('uncaughtException', function (err) {
    return logger.error('uncaughtException', { err: err });
  });
  process.on('unhandledRejection', function (err) {
    return logger.error('unhandledRejection', { err: err });
  });
}
//# sourceMappingURL=index.js.map