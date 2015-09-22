import Logger from '../lib/Logger';
import Handler from '../lib/Handler';
// import LogLevel from '../lib/LogLevel';

import ConsoleHandler from '../lib/handlers/ConsoleHandler';

var logger = new Logger([
    new ConsoleHandler(0)
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
