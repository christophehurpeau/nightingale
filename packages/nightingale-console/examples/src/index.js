import Logger, { configure, levels } from 'nightingale';
import ConsoleHandler from '../../src';

configure([
  { handlers: [new ConsoleHandler(levels.INFO)] },
]);

const logger = new Logger('nightingale:console');

logger.debug('test');
logger.info('test');
logger.warn('test');
