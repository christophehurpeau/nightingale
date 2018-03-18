'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sourceMapSupport = require('source-map-support');
var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var ConsoleHandler = _interopDefault(require('nightingale-console'));

sourceMapSupport.install({
  environment: 'node'
});


const logger = new Logger__default('app');

Error.stackTraceLimit = Infinity;
Logger.listenUnhandledErrors(logger);


Logger.configure([{
  pattern: /^app(:.*)?$/,
  handlers: [new ConsoleHandler(Logger.levels.DEBUG)],
  stop: true
}, {
  handlers: [new ConsoleHandler(Logger.levels.INFO)]
}].filter(Boolean));

exports.configure = Logger.configure;
exports.addConfig = Logger.addConfig;
exports.levels = Logger.levels;
exports.logger = logger;
//# sourceMappingURL=index-node6-dev.cjs.js.map
