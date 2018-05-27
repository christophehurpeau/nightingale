'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var BrowserConsoleHandler = _interopDefault(require('nightingale-browser-console'));

var ConsoleHandler = BrowserConsoleHandler;
var logger = new Logger__default('app');
var appLogger = logger;
Logger.configure([{
  handlers: [new ConsoleHandler(Logger.levels.INFO)]
}]);

exports.configure = Logger.configure;
exports.addConfig = Logger.addConfig;
exports.levels = Logger.levels;
exports.logger = logger;
exports.appLogger = appLogger;
//# sourceMappingURL=index-browser.cjs.js.map
