'use strict';

const Logger = require('nightingale');
const ConsoleHandler = require('nightingale-console');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);
const ConsoleHandler__default = /*#__PURE__*/_interopDefaultLegacy(ConsoleHandler);

Logger.configure([{
  handlers: [new ConsoleHandler__default(Logger.Level.ALL)]
}, {
  pattern: /^app/,
  handlers: [new ConsoleHandler__default(Logger.Level.ALL)]
}]);
const appLogger = new Logger__default('app');
const worker1Logger = new Logger__default('app:worker1');
const worker2Logger = new Logger__default('app:worker2');
[appLogger, worker1Logger, worker2Logger].forEach(logger => {
  setTimeout(() => logger.log('log()'), Math.floor(Math.random() * 100));
  setTimeout(() => logger.info('info()'), Math.floor(Math.random() * 100));
  setTimeout(() => logger.warn('warn()'), Math.floor(Math.random() * 100));
  setTimeout(() => logger.error('error()'), Math.floor(Math.random() * 100));
  setTimeout(() => logger.alert('alert()'), Math.floor(Math.random() * 100));
  setTimeout(() => logger.fatal('fatal()'), Math.floor(Math.random() * 100));
  setTimeout(() => logger.debug('debug()'), Math.floor(Math.random() * 100));
});
//# sourceMappingURL=debug-node10.cjs.js.map
