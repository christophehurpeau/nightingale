'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var ConsoleHandler = _interopDefault(require('nightingale-console'));

var logger = new Logger__default('app');

Logger.configure([false, {
  handlers: [new ConsoleHandler(Logger.levels.INFO)]
}].filter(Boolean));

exports.configure = Logger.configure;
exports.addConfig = Logger.addConfig;
exports.levels = Logger.levels;
exports.logger = logger;
//# sourceMappingURL=index-browser.cjs.js.map
