import Logger, { configure, levels } from 'nightingale';
import ConsoleHandler from '../../src';

configure([
  { handlers: [new ConsoleHandler(levels.INFO)] },
]);

const nightingaleLogger = new Logger('nightingale');

nightingaleLogger.setContext({ nightingale: true });
nightingaleLogger.info('test');

const logger = nightingaleLogger.child('console');
logger.setContext({ nightingaleConsole: true });

logger.info('test');
