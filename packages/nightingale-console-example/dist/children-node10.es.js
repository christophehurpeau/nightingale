import Logger, { configure, Level } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

configure([{
  handlers: [new ConsoleHandler(Level.INFO)]
}]);
const nightingaleLogger = new Logger('nightingale');
nightingaleLogger.setContext({
  nightingale: true
});
nightingaleLogger.info('test');
const logger = nightingaleLogger.child('console');
logger.setContext({
  nightingaleConsole: true
});
logger.info('test');
//# sourceMappingURL=children-node10.es.js.map
