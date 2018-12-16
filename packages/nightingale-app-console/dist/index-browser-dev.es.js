import { install } from 'source-map-support';
import Logger, { configure, Level } from 'nightingale';
export { configure, addConfig, Level, levels } from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';

var ConsoleHandler = BrowserConsoleHandler;
install({
  environment: 'browser'
});
var logger = new Logger('app');
var appLogger = logger;
configure([{
  pattern: /^app(:|$)/,
  handlers: [new ConsoleHandler(Level.DEBUG)],
  stop: true
}, {
  handlers: [new ConsoleHandler(Level.INFO)]
}]);

export { logger, appLogger };
//# sourceMappingURL=index-browser-dev.es.js.map
