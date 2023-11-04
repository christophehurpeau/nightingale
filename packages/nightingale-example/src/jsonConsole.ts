import { Logger, configure, Level } from 'nightingale';
import consoleOutput from 'nightingale-console-output';
import jsonFormatter from 'nightingale-json-formatter';
import type { Handler, LogRecord, Metadata } from 'nightingale-types';

class JSONHandler implements Handler {
  minLevel: Level;

  constructor(minLevel: Level) {
    this.minLevel = minLevel;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  handle<T extends Metadata>(record: LogRecord<T>): void {
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
setTimeout(() => {
  logger.timeEnd(timeStarted, 'time measured');
}, 2000);

logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
