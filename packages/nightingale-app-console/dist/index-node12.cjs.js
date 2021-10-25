'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingale = require('nightingale');
const nightingaleConsole = require('nightingale-console');

const ConsoleHandler = nightingaleConsole.ConsoleHandler;
const logger = new nightingale.Logger('app');
const appLogger = logger;
Error.stackTraceLimit = Infinity;
nightingale.listenUnhandledErrors(logger);
const appMinLevel = process.env.NIGHTINGALE_APP_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_APP_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_APP_MIN_LEVEL) : nightingale.Level.INFO;
const libMinLevel = process.env.NIGHTINGALE_LIB_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL) : nightingale.Level.INFO;
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
//# sourceMappingURL=index-node12.cjs.js.map
