'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingale = require('nightingale');
var nightingaleBrowserConsole = require('nightingale-browser-console');

var ConsoleHandler = nightingaleBrowserConsole.BrowserConsoleHandler;
var logger = new nightingale.Logger('app');
var appLogger = logger;
var appMinLevel = // eslint-disable-next-line unicorn/no-nested-ternary
nightingale.Level.DEBUG;
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
//# sourceMappingURL=index-browser-dev.cjs.js.map
