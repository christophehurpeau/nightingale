'use strict';

const Logger = require('nightingale');
const ConsoleHandler = require('nightingale-console');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);
const ConsoleHandler__default = /*#__PURE__*/_interopDefaultLegacy(ConsoleHandler);

Logger.configure([{
  stop: true,
  key: 'app',
  handlers: [new ConsoleHandler__default(Logger.Level.DEBUG)]
}, {
  stop: true,
  pattern: /^app:service:/,
  handlers: [new ConsoleHandler__default(Logger.Level.INFO)]
}, {
  handlers: [new ConsoleHandler__default(Logger.Level.ALL)]
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
