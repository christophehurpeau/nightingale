'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Logger = require('nightingale');
var BrowserConsoleHandler = require('nightingale-browser-console');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);
var BrowserConsoleHandler__default = /*#__PURE__*/_interopDefaultLegacy(BrowserConsoleHandler);

var ConsoleHandler = BrowserConsoleHandler__default;
var logger = new Logger__default('app');
var appLogger = logger;
Logger.configure([{
  handlers: [new ConsoleHandler(Logger.Level.INFO)]
}]);

exports.Level = Logger.Level;
exports.addConfig = Logger.addConfig;
exports.configure = Logger.configure;
exports.levels = Logger.levels;
exports.appLogger = appLogger;
exports.logger = logger;
//# sourceMappingURL=index-browser.cjs.js.map
