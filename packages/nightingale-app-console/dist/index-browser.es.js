import Logger, { configure, addConfig, levels } from 'nightingale';
export { configure, addConfig, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

var logger = new Logger('app');
configure([{
  handlers: [new ConsoleHandler(levels.INFO)]
}]);

export { logger };
//# sourceMappingURL=index-browser.es.js.map
