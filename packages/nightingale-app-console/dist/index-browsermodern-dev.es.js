import { install } from 'source-map-support';
import Logger, { configure, Level } from 'nightingale';
export { Level, addConfig, configure, levels } from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';

const ConsoleHandler = BrowserConsoleHandler;
install({
  environment: 'browser'
});
const logger = new Logger('app');
const appLogger = logger;
configure([{
  pattern: /^app(:|$)/,
  handlers: [new ConsoleHandler(Level.DEBUG)],
  stop: true
}, {
  handlers: [new ConsoleHandler(Level.INFO)]
}]);

export { appLogger, logger };
//# sourceMappingURL=index-browsermodern-dev.es.js.map
