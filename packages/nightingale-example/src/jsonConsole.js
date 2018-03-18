import Logger, { configure, levels } from 'nightingale';
import jsonFormatter from 'nightingale-json-formatter';
import consoleOutput from 'nightingale-console-output';

const handle = (record: Object) => consoleOutput(jsonFormatter(record), record);

function JSONHandler(minLevel: number) {
  this.minLevel = 0;
  this.handle = handle;
}

configure([
  {
    handlers: [new JSONHandler(levels.ALL)],
  },
]);

const logger = new Logger('app');

logger.log('test');

const timeStarted = logger.time();
setTimeout(() => logger.timeEnd(timeStarted, 'time measured'), 2000);

logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
