'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Logger = require('nightingale');
var BrowserConsoleHandler = require('nightingale-browser-console');
var sourceMapSupport = require('source-map-support');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);
var BrowserConsoleHandler__default = /*#__PURE__*/_interopDefaultLegacy(BrowserConsoleHandler);

var ConsoleHandler = BrowserConsoleHandler__default;
sourceMapSupport.install({
  environment: 'browser'
});
var logger = new Logger__default('app');
var appLogger = logger;
Logger.configure([{
  pattern: /^app(:|$)/,
  handlers: [new ConsoleHandler(Logger.Level.DEBUG)],
  stop: true
}, {
  handlers: [new ConsoleHandler(Logger.Level.INFO)]
}]);

exports.Level = Logger.Level;
exports.addConfig = Logger.addConfig;
exports.configure = Logger.configure;
exports.levels = Logger.levels;
exports.appLogger = appLogger;
exports.logger = logger;
//# sourceMappingURL=index-browser-dev.cjs.js.map
