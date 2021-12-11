import { POB_TARGET, PRODUCTION } from 'pob-babel';
import { Logger, listenUnhandledErrors, Level, configure } from 'nightingale';
export { Level, addConfig, configure, levels } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';
import { ConsoleHandler as ConsoleHandler$1 } from 'nightingale-console';

const ConsoleHandler = POB_TARGET === 'browser' ? BrowserConsoleHandler : ConsoleHandler$1;
const logger = new Logger('app');
const appLogger = logger;

if (POB_TARGET !== 'browser') {
  Error.stackTraceLimit = Infinity;
  listenUnhandledErrors(logger);
}

const appMinLevel = POB_TARGET !== 'browser' && process.env.NIGHTINGALE_APP_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_APP_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_APP_MIN_LEVEL) : PRODUCTION ? Level.INFO : Level.DEBUG;
const libMinLevel = POB_TARGET !== 'browser' && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL) : Level.INFO;
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
//# sourceMappingURL=index-browsermodern.es.js.map
