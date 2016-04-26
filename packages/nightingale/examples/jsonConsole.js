import Logger, { configure, levels } from '..';
import Handler from 'nightingale-handler';
import jsonFormatter from 'nightingale-json-formatter';
import consoleOutput from 'nightingale-console-output';

configure([
    {
        handlers: [new Handler(levels.ALL, jsonFormatter, consoleOutput)],
    },
]);

const logger = new Logger('app');

logger.log('test');

const timeStarted = logger.time();
setTimeout(logger.timeEnd(timeStarted), 2000);

logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
