'use strict';

const Logger = require('nightingale');
const ConsoleHandler = require('nightingale-console');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);
const ConsoleHandler__default = /*#__PURE__*/_interopDefaultLegacy(ConsoleHandler);

Logger.configure([{
  handlers: [new ConsoleHandler__default(Logger.Level.ALL)]
}]);
const logger = new Logger__default('app');
logger.error(new Error('test'));
logger.error('test', {
  error: new Error('test')
});
//# sourceMappingURL=errors-node10.cjs.js.map
