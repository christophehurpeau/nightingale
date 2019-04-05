import Logger, { configure, Level } from 'nightingale';
export { Level, addConfig, configure, levels } from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';

var ConsoleHandler = BrowserConsoleHandler;
var logger = new Logger('app');
var appLogger = logger;
configure([{
  handlers: [new ConsoleHandler(Level.INFO)]
}]);

export { appLogger, logger };
//# sourceMappingURL=index-browser.es.js.map
