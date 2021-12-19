'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingale = require('nightingale');
var nightingaleBrowserConsole = require('nightingale-browser-console');

var ConsoleHandler = nightingaleBrowserConsole.BrowserConsoleHandler;
var logger = new nightingale.Logger('app');
var appLogger = logger;
var appMinLevel = (process.env.NODE_ENV !== "production") ? nightingale.Level.DEBUG : nightingale.Level.INFO;
var libMinLevel = nightingale.Level.INFO;
nightingale.configure(appMinLevel !== libMinLevel ? [{
  pattern: /^app(:|$)/,
  handlers: [new ConsoleHandler(appMinLevel)],
  stop: true
}, {
  handlers: [new ConsoleHandler(libMinLevel)]
}] : [{
  handlers: [new ConsoleHandler(libMinLevel)]
}]);

exports.Level = nightingale.Level;
exports.addConfig = nightingale.addConfig;
exports.configure = nightingale.configure;
exports.levels = nightingale.levels;
exports.ConsoleHandler = ConsoleHandler;
exports.appLogger = appLogger;
exports.logger = logger;
//# sourceMappingURL=index-browser.cjs.js.map
