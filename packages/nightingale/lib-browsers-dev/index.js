'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levels = exports.addGlobalHandler = exports.addGlobalProcessor = exports.configure = exports.default = undefined;

var _config = require('./config');

Object.defineProperty(exports, 'configure', {
  enumerable: true,
  get: function get() {
    return _config.configure;
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

var _nightingaleLogger = require('nightingale-logger');

var _nightingaleLogger2 = _interopRequireDefault(_nightingaleLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _nightingaleLogger2.default;
//# sourceMappingURL=index.js.map