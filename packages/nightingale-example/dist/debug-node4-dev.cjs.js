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
var appLogger = new Logger__default('app');
var worker1Logger = new Logger__default('app:worker1');
var worker2Logger = new Logger__default('app:worker2');
[appLogger, worker1Logger, worker2Logger].forEach(function (logger) {
  setTimeout(function () {
    return logger.log('log()');
  }, Math.floor(Math.random() * 100));
  setTimeout(function () {
    return logger.info('info()');
  }, Math.floor(Math.random() * 100));
  setTimeout(function () {
    return logger.warn('warn()');
  }, Math.floor(Math.random() * 100));
  setTimeout(function () {
    return logger.error('error()');
  }, Math.floor(Math.random() * 100));
  setTimeout(function () {
    return logger.alert('alert()');
  }, Math.floor(Math.random() * 100));
  setTimeout(function () {
    return logger.fatal('fatal()');
  }, Math.floor(Math.random() * 100));
  setTimeout(function () {
    return logger.debug('debug()');
  }, Math.floor(Math.random() * 100));
});
//# sourceMappingURL=debug-node4-dev.cjs.js.map
