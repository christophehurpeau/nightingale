'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const Logger = require('nightingale');
const TerminalConsoleHandler = require('nightingale-console');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);
const TerminalConsoleHandler__default = /*#__PURE__*/_interopDefaultLegacy(TerminalConsoleHandler);

const ConsoleHandler = TerminalConsoleHandler__default;
const logger = new Logger__default('app');
const appLogger = logger;
Error.stackTraceLimit = Infinity;
Logger.listenUnhandledErrors(logger);
const appMinLevel = process.env.NIGHTINGALE_APP_MIN_LEVEL === undefined ? Number(process.env.NIGHTINGALE_APP_MIN_LEVEL) : // eslint-disable-next-line unicorn/no-nested-ternary
Logger.Level.DEBUG;
const libMinLevel = process.env.NIGHTINGALE_LIB_MIN_LEVEL === undefined ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL) : Logger.Level.INFO;
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
//# sourceMappingURL=index-node12-dev.cjs.js.map
