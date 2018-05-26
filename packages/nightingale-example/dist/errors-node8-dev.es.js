import Logger, { configure, Level } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

configure([{
  handlers: [new ConsoleHandler(Level.ALL)]
}]);
const logger = new Logger('app');
logger.error(new Error('test'));
logger.error('test', {
  error: new Error('test')
});
//# sourceMappingURL=errors-node8-dev.es.js.map
