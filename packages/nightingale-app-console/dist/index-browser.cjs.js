'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pobBabel = require('pob-babel');
var nightingale = require('nightingale');
var nightingaleBrowserConsole = require('nightingale-browser-console');
var nightingaleConsole = require('nightingale-console');

var ConsoleHandler = pobBabel.POB_TARGET === 'browser' ? nightingaleBrowserConsole.BrowserConsoleHandler : nightingaleConsole.ConsoleHandler;
var logger = new nightingale.Logger('app');
var appLogger = logger;

if (pobBabel.POB_TARGET !== 'browser') {
  Error.stackTraceLimit = Infinity;
  nightingale.listenUnhandledErrors(logger);
}

var appMinLevel = pobBabel.POB_TARGET !== 'browser' && process.env.NIGHTINGALE_APP_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_APP_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_APP_MIN_LEVEL) : pobBabel.PRODUCTION ? nightingale.Level.INFO : nightingale.Level.DEBUG;
var libMinLevel = pobBabel.POB_TARGET !== 'browser' && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL) : nightingale.Level.INFO;
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
