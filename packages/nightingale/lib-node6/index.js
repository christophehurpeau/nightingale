'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levels = exports.addGlobalHandler = exports.addGlobalProcessor = exports.addConfig = exports.configure = exports.default = undefined;

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
Object.defineProperty(exports, 'addGlobalProcessor', {
  enumerable: true,
  get: function get() {
    return _config.addGlobalProcessor;
  }
});
Object.defineProperty(exports, 'addGlobalHandler', {
  enumerable: true,
  get: function get() {
    return _config.addGlobalHandler;
  }
});

var _nightingaleLevels = require('nightingale-levels');

Object.defineProperty(exports, 'levels', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nightingaleLevels).default;
  }
});
exports.listenUnhandledErrors = listenUnhandledErrors;

var _nightingaleLogger = require('nightingale-logger');

var _nightingaleLogger2 = _interopRequireDefault(_nightingaleLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _nightingaleLogger2.default;


/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */
function listenUnhandledErrors(logger) {
  if (!logger) logger = new _nightingaleLogger2.default('nightingale.listenUnhandledErrors', 'listenUnhandledErrors');
  process.on('uncaughtException', err => logger.error('uncaughtException', { err }));
  process.on('unhandledRejection', err => logger.error('unhandledRejection', { err }));
}
//# sourceMappingURL=index.js.map