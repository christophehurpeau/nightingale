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
var appMinLevel = // eslint-disable-next-line unicorn/no-nested-ternary
Logger.Level.DEBUG;
var libMinLevel = Logger.Level.INFO;
Logger.configure(appMinLevel !== libMinLevel ? [{
  pattern: /^app(:|$)/,
  handlers: [new ConsoleHandler(appMinLevel)],
  stop: true
}, {
  handlers: [new ConsoleHandler(libMinLevel)]
}] : [{
  handlers: [new ConsoleHandler(libMinLevel)]
}]);

exports.Level = Logger.Level;
exports.addConfig = Logger.addConfig;
exports.configure = Logger.configure;
exports.levels = Logger.levels;
exports.ConsoleHandler = ConsoleHandler;
exports.appLogger = appLogger;
exports.logger = logger;
//# sourceMappingURL=index-browser-dev.cjs.js.map
