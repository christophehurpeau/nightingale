'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var ConsoleHandler = _interopDefault(require('nightingale-console'));

var logger = new Logger__default('console');
Logger.configure([{
  handlers: [new ConsoleHandler(Logger.Level.ALL)]
}]);
logger.log('log()');
logger.info('info()');
logger.warn('warn()');
logger.error('error()');
logger.alert('alert()');
logger.fatal('fatal()');
logger.debug('debug()');
logger.inspectValue('inspect()');
logger.inspectVar('varName', 'inspectVar()');
logger.success('success()');
var timeStarted = logger.time();
setTimeout(function () {
  return logger.timeEnd(timeStarted, 'time');
}, 2000);
//# sourceMappingURL=console-node4-dev.cjs.js.map
