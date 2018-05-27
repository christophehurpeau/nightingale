import { install } from 'source-map-support';
import Logger, { configure, addConfig, levels } from 'nightingale';
export { configure, addConfig, levels } from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';

const ConsoleHandler = BrowserConsoleHandler;
install({
  environment: 'browser'
});
const logger = new Logger('app');
const appLogger = logger;
configure([{
  pattern: /^app(:.*)?$/,
  handlers: [new ConsoleHandler(levels.DEBUG)],
  stop: true
}, {
  handlers: [new ConsoleHandler(levels.INFO)]
}]);

export { logger, appLogger };
//# sourceMappingURL=index-browsermodern-dev.es.js.map
