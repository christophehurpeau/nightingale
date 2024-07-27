import { Logger, Level, configure, BrowserConsoleHandler } from 'nightingale';
export { Level, addConfig, configure, levels } from 'nightingale';

const ConsoleHandler = BrowserConsoleHandler;
const logger = new Logger("app");
const appLogger = logger;
const appMinLevel = (() => {
  return process.env.NODE_ENV !== "production" ? Level.DEBUG : Level.INFO;
})();
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
//# sourceMappingURL=index-browser.es.js.map
