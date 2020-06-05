import Logger, { configure, Level } from 'nightingale';
import consoleOutput from 'nightingale-console-output';
import jsonFormatter from 'nightingale-json-formatter';
import { LogRecord } from 'nightingale-types';

class JSONHandler {
  minLevel: Level;

  constructor(minLevel: number) {
    this.minLevel = minLevel;
  }

  handle<T>(record: LogRecord<T>): void {
    consoleOutput(jsonFormatter(record), record);
  }
}

configure([
  {
    handlers: [new JSONHandler(Level.ALL)],
  },
]);

const logger = new Logger('app');

logger.log('test');

const timeStarted = logger.time();
setTimeout(() => logger.timeEnd(timeStarted, 'time measured'), 2000);

logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
