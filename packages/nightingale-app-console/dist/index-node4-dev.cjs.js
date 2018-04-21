'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sourceMapSupport = require('source-map-support');
var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var ConsoleHandler = _interopDefault(require('nightingale-console'));

if (process.env.POB_TARGET !== 'browser' || process.env.NODE_ENV !== 'production') {
  sourceMapSupport.install({
    environment: process.env.POB_TARGET === 'browser' ? 'browser' : 'node'
  });
}

var logger = new Logger__default('app');

if (process.env.POB_TARGET !== 'browser') {
  Error.stackTraceLimit = Infinity;
  Logger.listenUnhandledErrors(logger);
}

Logger.configure(process.env.NODE_ENV !== 'production' ? [{
  pattern: /^app(:.*)?$/,
  handlers: [new ConsoleHandler(Logger.levels.DEBUG)],
  stop: true
}, {
  handlers: [new ConsoleHandler(Logger.levels.INFO)]
}] : [{
  handlers: [new ConsoleHandler(Logger.levels.INFO)]
}]);

exports.configure = Logger.configure;
exports.addConfig = Logger.addConfig;
exports.levels = Logger.levels;
exports.logger = logger;
//# sourceMappingURL=index-node4-dev.cjs.js.map
