import { BrowserConsoleHandler, Logger, Level, configure } from 'nightingale';
export { Level, addConfig, configure, levels } from 'nightingale';

const ConsoleHandler = BrowserConsoleHandler;

const logger = new Logger("app");
const appLogger = logger;
const appMinLevel = (() => {
  if (process.env.NIGHTINGALE_APP_MIN_LEVEL !== void 0 && process.env.NIGHTINGALE_APP_MIN_LEVEL !== "") {
    return Number(process.env.NIGHTINGALE_APP_MIN_LEVEL);
  }
  return process.env.NODE_ENV !== "production" ? Level.DEBUG : Level.INFO;
})();
const libMinLevel = process.env.NIGHTINGALE_LIB_MIN_LEVEL !== void 0 && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== "" ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL) : Level.INFO;
configure(
  appMinLevel !== libMinLevel ? [
    {
      pattern: /^app(:|$)/,
      handlers: [new ConsoleHandler(appMinLevel)],
      stop: true
    },
    {
      handlers: [new ConsoleHandler(libMinLevel)]
    }
  ] : [
    {
      handlers: [new ConsoleHandler(libMinLevel)]
    }
  ]
);

export { appLogger, logger };
//# sourceMappingURL=index-browser.es.js.map
