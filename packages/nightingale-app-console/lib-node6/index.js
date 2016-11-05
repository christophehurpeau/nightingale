'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports.levels = exports.addConfig = exports.configure = undefined;

var _nightingale = require('nightingale');

var _nightingale2 = _interopRequireDefault(_nightingale);

var _nightingaleConsole = require('nightingale-console');

var _nightingaleConsole2 = _interopRequireDefault(_nightingaleConsole);

var _nightingaleErrorProcessor = require('nightingale-error-processor');

var _nightingaleErrorProcessor2 = _interopRequireDefault(_nightingaleErrorProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.configure = _nightingale.configure;
exports.addConfig = _nightingale.addConfig;
exports.levels = _nightingale.levels;
const logger = exports.logger = new _nightingale2.default('app');

(0, _nightingale.listenUnhandledErrors)(logger);

(0, _nightingale.configure)([{
  processors: [_nightingaleErrorProcessor2.default]
}, false, {
  handlers: [new _nightingaleConsole2.default(_nightingale.levels.INFO)]
}].filter(Boolean));
//# sourceMappingURL=index.js.map