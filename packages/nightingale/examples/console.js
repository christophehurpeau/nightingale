import Logger, { configure, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

const logger = new Logger();

configure([
    { handlers: [new ConsoleHandler(levels.ALL)] },
]);

logger.log('log()');
logger.info('info()');
logger.warn('warn()');
logger.error('error()');
logger.alert('alert()');
logger.fatal('fatal()');
logger.debug('debug()');
logger.inspect('inspect()');
logger.inspectVar('varName', 'inspectVar()');
logger.success('success()');

const timeStarted = logger.time();
setTimeout(logger.timeEnd(timeStarted), 2000);
