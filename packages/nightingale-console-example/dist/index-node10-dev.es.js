import Logger, { configure, Level } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

configure([{
  handlers: [new ConsoleHandler(Level.INFO)]
}]);
const logger = new Logger('nightingale:console');
logger.debug('test');
logger.info('test');
logger.warn('test');
//# sourceMappingURL=index-node10-dev.es.js.map
