import Logger, { configure, levels } from '../..';
import ConsoleHandler from 'nightingale-console';

configure([
    {
        handlers: [new ConsoleHandler(levels.ALL)],
    },
]);

const logger = new Logger('app');

logger.log('test', { test: 'test', obj: { val: 1000 } });

const timeStarted = logger.time();
setTimeout(logger.timeEnd(timeStarted), 2000);

logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
