import { Logger, configure, Level } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

const logger = new Logger('console');

configure([{ handlers: [new ConsoleHandler(Level.ALL)] }]);

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

function testWrap(): void {
  logger.wrap(testWrap, () => {
    console.log('log from testWrap');
  });
}
testWrap();

function testWrapWithMetadata(): void {
  logger.wrap(testWrap, { port: 3000 }, () => {
    console.log('log from testWrapWithMetadata');
  });
}
testWrapWithMetadata();

const timeStarted = logger.time();
setTimeout(() => {
  logger.timeEnd(timeStarted, 'time');
}, 2000);
