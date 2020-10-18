'use strict';

const Logger = require('nightingale');
const ConsoleHandler = require('nightingale-console');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);
const ConsoleHandler__default = /*#__PURE__*/_interopDefaultLegacy(ConsoleHandler);

const logger = new Logger__default('console');
Logger.configure([{
  handlers: [new ConsoleHandler__default(Logger.Level.ALL)]
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

function testWrap() {
  logger.wrap(testWrap, () => {
    console.log('log from testWrap');
  });
}

testWrap();

function testWrapWithMetadata() {
  logger.wrap(testWrap, {
    port: 3000
  }, () => {
    console.log('log from testWrapWithMetadata');
  });
}

testWrapWithMetadata();
const timeStarted = logger.time();
setTimeout(() => logger.timeEnd(timeStarted, 'time'), 2000);
//# sourceMappingURL=console-node10.cjs.js.map
