import Logger, { configure, levels, addGlobalProcessor } from '..';
import ConsoleHandler from 'nightingale-console';
import errorProcessor from 'nightingale-error-processor';

configure([
    {
        processors: [errorProcessor],
        handlers: [new ConsoleHandler(levels.ALL)],
    },
]);
addGlobalProcessor(errorProcessor);

const logger = new Logger('app');

logger.log('test', { test: 'test', obj: { val: 1000 } });
logger.log('test', { val: true });

const timeStarted = logger.time();
setTimeout(logger.timeEnd(timeStarted), 2000);

// logger.error(new Error('test'));
// logger.error('test', { error: new Error('test') });
logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
