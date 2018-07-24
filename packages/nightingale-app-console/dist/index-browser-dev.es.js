import { install } from 'source-map-support';
import Logger, { configure, addConfig, levels } from 'nightingale';
export { configure, addConfig, levels } from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';

var ConsoleHandler = BrowserConsoleHandler;
install({
  environment: 'browser'
});
var logger = new Logger('app');
var appLogger = logger;
configure([{
  pattern: /^app(:|$)/,
  handlers: [new ConsoleHandler(levels.DEBUG)],
  stop: true
}, {
  handlers: [new ConsoleHandler(levels.INFO)]
}]);

export { logger, appLogger };
//# sourceMappingURL=index-browser-dev.es.js.map
