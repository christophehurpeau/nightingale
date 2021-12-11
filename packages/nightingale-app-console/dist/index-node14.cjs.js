'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const pobBabel = require('pob-babel');
const nightingale = require('nightingale');
const nightingaleBrowserConsole = require('nightingale-browser-console');
const nightingaleConsole = require('nightingale-console');

const ConsoleHandler = pobBabel.POB_TARGET === 'browser' ? nightingaleBrowserConsole.BrowserConsoleHandler : nightingaleConsole.ConsoleHandler;
const logger = new nightingale.Logger('app');
const appLogger = logger;

if (pobBabel.POB_TARGET !== 'browser') {
  Error.stackTraceLimit = Infinity;
  nightingale.listenUnhandledErrors(logger);
}

const appMinLevel = pobBabel.POB_TARGET !== 'browser' && process.env.NIGHTINGALE_APP_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_APP_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_APP_MIN_LEVEL) : pobBabel.PRODUCTION ? nightingale.Level.INFO : nightingale.Level.DEBUG;
const libMinLevel = pobBabel.POB_TARGET !== 'browser' && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL) : nightingale.Level.INFO;
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
//# sourceMappingURL=index-node14.cjs.js.map
