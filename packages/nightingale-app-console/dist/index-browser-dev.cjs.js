'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sourceMapSupport = require('source-map-support');
var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var BrowserConsoleHandler = _interopDefault(require('nightingale-browser-console'));

var ConsoleHandler = BrowserConsoleHandler;
sourceMapSupport.install({
  environment: 'browser'
});
var logger = new Logger__default('app');
var appLogger = logger;
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
//# sourceMappingURL=index-browser-dev.cjs.js.map
