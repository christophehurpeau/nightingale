'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var ConsoleHandler = _interopDefault(require('nightingale-console'));

Logger.configure([{
  stop: true,
  key: 'app',
  handlers: [new ConsoleHandler(Logger.Level.DEBUG)]
}, {
  stop: true,
  pattern: /^app:service:/,
  handlers: [new ConsoleHandler(Logger.Level.INFO)]
}, {
  handlers: [new ConsoleHandler(Logger.Level.ALL)]
}]);
const smthg = new Logger__default('smthg');
const app = new Logger__default('app');
const appService = new Logger__default('app:service:myService:insideMyService');
smthg.trace('shoud appear 1');
app.trace('shoud not appear');
app.info('shoud appear 2');
appService.trace('shoud not appear');
appService.debug('shoud not appear');
appService.info('shoud appear 3');
//# sourceMappingURL=configure-node10.cjs.js.map
