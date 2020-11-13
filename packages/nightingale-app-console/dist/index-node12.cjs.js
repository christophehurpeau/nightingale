'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const sourceMapSupport = require('source-map-support');
const Logger = require('nightingale');
const TerminalConsoleHandler = require('nightingale-console');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);
const TerminalConsoleHandler__default = /*#__PURE__*/_interopDefaultLegacy(TerminalConsoleHandler);

const ConsoleHandler = TerminalConsoleHandler__default;
sourceMapSupport.install({
  environment: 'node'
});
const logger = new Logger__default('app');
const appLogger = logger;
Error.stackTraceLimit = Infinity;
Logger.listenUnhandledErrors(logger);
Logger.configure([{
  handlers: [new ConsoleHandler(Logger.Level.INFO)]
}]);

exports.Level = Logger.Level;
exports.addConfig = Logger.addConfig;
exports.configure = Logger.configure;
exports.levels = Logger.levels;
exports.appLogger = appLogger;
exports.logger = logger;
//# sourceMappingURL=index-node12.cjs.js.map
