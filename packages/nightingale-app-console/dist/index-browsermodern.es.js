import Logger, { configure, Level } from 'nightingale';
export { Level, addConfig, configure, levels } from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';

const ConsoleHandler = BrowserConsoleHandler;
const logger = new Logger('app');
const appLogger = logger;
configure([{
  handlers: [new ConsoleHandler(Level.INFO)]
}]);

export { appLogger, logger };
//# sourceMappingURL=index-browsermodern.es.js.map
