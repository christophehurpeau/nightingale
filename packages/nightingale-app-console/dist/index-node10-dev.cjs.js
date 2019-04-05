'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const sourceMapSupport = require('source-map-support');
const Logger = require('nightingale');
const Logger__default = _interopDefault(Logger);
const TerminalConsoleHandler = _interopDefault(require('nightingale-console'));

const ConsoleHandler = TerminalConsoleHandler;
sourceMapSupport.install({
  environment: 'node'
});
const logger = new Logger__default('app');
const appLogger = logger;
Error.stackTraceLimit = Infinity;
Logger.listenUnhandledErrors(logger);
Logger.configure([{
  pattern: /^app(:|$)/,
  handlers: [new ConsoleHandler(Logger.Level.DEBUG)],
  stop: true
}, {
  handlers: [new ConsoleHandler(Logger.Level.INFO)]
}]);

Object.defineProperty(exports, 'Level', {
  enumerable: true,
  get: function () {
    return Logger.Level;
  }
});
Object.defineProperty(exports, 'addConfig', {
  enumerable: true,
  get: function () {
    return Logger.addConfig;
  }
});
Object.defineProperty(exports, 'configure', {
  enumerable: true,
  get: function () {
    return Logger.configure;
  }
});
Object.defineProperty(exports, 'levels', {
  enumerable: true,
  get: function () {
    return Logger.levels;
  }
});
exports.appLogger = appLogger;
exports.logger = logger;
//# sourceMappingURL=index-node10-dev.cjs.js.map
