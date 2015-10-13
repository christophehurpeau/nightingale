import Logger from '../lib/Logger';
import LogLevel from '../lib/LogLevel';
import ConsoleHandler from '../lib/handlers/ConsoleHandler';

const logger = new Logger([
    new ConsoleHandler(LogLevel.ALL),
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
