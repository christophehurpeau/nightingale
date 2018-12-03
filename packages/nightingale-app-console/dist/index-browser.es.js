import Logger, { configure, addConfig, Level, levels } from 'nightingale';
export { configure, addConfig, Level, levels } from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';

var ConsoleHandler = BrowserConsoleHandler;
var logger = new Logger('app');
var appLogger = logger;
configure([{
  handlers: [new ConsoleHandler(Level.INFO)]
}]);

export { logger, appLogger };
//# sourceMappingURL=index-browser.es.js.map
