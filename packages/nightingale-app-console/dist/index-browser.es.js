import { Logger, Level, configure } from 'nightingale';
export { Level, addConfig, configure, levels } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';

var ConsoleHandler = BrowserConsoleHandler;
var logger = new Logger('app');
var appLogger = logger;
var appMinLevel = // eslint-disable-next-line unicorn/no-nested-ternary
Level.INFO;
var libMinLevel = Level.INFO;
configure(appMinLevel !== libMinLevel ? [{
  pattern: /^app(:|$)/,
  handlers: [new ConsoleHandler(appMinLevel)],
  stop: true
}, {
  handlers: [new ConsoleHandler(libMinLevel)]
}] : [{
  handlers: [new ConsoleHandler(libMinLevel)]
}]);

export { ConsoleHandler, appLogger, logger };
//# sourceMappingURL=index-browser.es.js.map
