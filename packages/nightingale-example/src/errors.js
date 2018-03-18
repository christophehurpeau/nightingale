import Logger, { configure, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

configure([
  {
    handlers: [new ConsoleHandler(levels.ALL)],
  },
]);

const logger = new Logger('app');

logger.error(new Error('test'));
logger.error('test', { error: new Error('test') });
