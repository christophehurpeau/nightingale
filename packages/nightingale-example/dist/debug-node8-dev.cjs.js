'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var ConsoleHandler = _interopDefault(require('nightingale-console'));

Logger.configure([{
  handlers: [new ConsoleHandler(Logger.Level.ALL)]
}, {
  pattern: /^app/,
  handlers: [new ConsoleHandler(Logger.Level.ALL)]
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
//# sourceMappingURL=debug-node8-dev.cjs.js.map
