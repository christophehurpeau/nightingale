const Logger = require('../../lib/node').Logger;
const LogLevel = require('../../lib/node').LogLevel;
import ConsoleHandler from '../../lib/handlers/ConsoleHandler';

const logger = new Logger([new ConsoleHandler(LogLevel.TRACE)]);

logger.log.call(null, 'test');

logger.time('test');
setTimeout(logger.timeEnd.bind(null, 'test'), 200);

const timeStarted = logger.time();
setTimeout(logger.timeEnd.bind(null, timeStarted), 2000);

logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
