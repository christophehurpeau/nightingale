import { Logger, Level, configure } from 'nightingale';
export { Level, addConfig, configure, levels } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';

const ConsoleHandler = BrowserConsoleHandler;
const logger = new Logger('app');
const appLogger = logger;
const appMinLevel = // eslint-disable-next-line unicorn/no-nested-ternary
Level.DEBUG;
const libMinLevel = Level.INFO;
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
//# sourceMappingURL=index-browsermodern-dev.es.js.map
