import Logger, { listenUnhandledErrors, Level, configure } from 'nightingale';
export { Level, addConfig, configure, levels } from 'nightingale';
import TerminalConsoleHandler from 'nightingale-console';

const ConsoleHandler = TerminalConsoleHandler;
const logger = new Logger('app');
const appLogger = logger;
Error.stackTraceLimit = Infinity;
listenUnhandledErrors(logger);
const appMinLevel = process.env.NIGHTINGALE_APP_MIN_LEVEL === undefined ? Number(process.env.NIGHTINGALE_APP_MIN_LEVEL) : Level.DEBUG;
const libMinLevel = process.env.NIGHTINGALE_LIB_MIN_LEVEL === undefined ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL) : Level.INFO;
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
//# sourceMappingURL=index-node12.mjs.map
