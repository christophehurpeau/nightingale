import { POB_TARGET, PRODUCTION } from 'pob-babel';
import { Logger, listenUnhandledErrors, Level, configure } from 'nightingale';
export { Level, addConfig, configure, levels } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';
import { ConsoleHandler as ConsoleHandler$1 } from 'nightingale-console';

var ConsoleHandler = POB_TARGET === 'browser' ? BrowserConsoleHandler : ConsoleHandler$1;
var logger = new Logger('app');
var appLogger = logger;

if (POB_TARGET !== 'browser') {
  Error.stackTraceLimit = Infinity;
  listenUnhandledErrors(logger);
}

var appMinLevel = POB_TARGET !== 'browser' && process.env.NIGHTINGALE_APP_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_APP_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_APP_MIN_LEVEL) : PRODUCTION ? Level.INFO : Level.DEBUG;
var libMinLevel = POB_TARGET !== 'browser' && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL) : Level.INFO;
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
