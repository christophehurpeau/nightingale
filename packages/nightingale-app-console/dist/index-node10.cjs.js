'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sourceMapSupport = require('source-map-support');
var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var TerminalConsoleHandler = _interopDefault(require('nightingale-console'));

const ConsoleHandler = TerminalConsoleHandler;
sourceMapSupport.install({
  environment: 'node'
});
const logger = new Logger__default('app');
const appLogger = logger;
Error.stackTraceLimit = Infinity;
Logger.listenUnhandledErrors(logger);
Logger.configure([{
  handlers: [new ConsoleHandler(Logger.levels.INFO)]
}]);

exports.configure = Logger.configure;
exports.addConfig = Logger.addConfig;
exports.levels = Logger.levels;
exports.logger = logger;
exports.appLogger = appLogger;
//# sourceMappingURL=index-node10.cjs.js.map
