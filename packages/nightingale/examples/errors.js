import Logger, { configure, levels } from '..';
import ConsoleHandler from 'nightingale-console';
import errorProcessor from 'nightingale-error-processor';

configure([
  {
    processors: [errorProcessor],
    handlers: [new ConsoleHandler(levels.ALL)],
  },
]);

const logger = new Logger('app');

logger.error(new Error('test'));
logger.error('test', { error: new Error('test') });
