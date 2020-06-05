import Logger, { configure, Level } from 'nightingale';
export { Level, addConfig, configure, levels } from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';
import { install } from 'source-map-support';

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

export { appLogger, logger };
//# sourceMappingURL=index-browser-dev.es.js.map
