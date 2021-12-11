import { Logger, configure, Level, listenUnhandledErrors } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';
import { ConsoleHandler as TerminalConsoleHandler } from 'nightingale-console';

export { configure, addConfig, levels, Level } from 'nightingale';

export const ConsoleHandler:
  | typeof BrowserConsoleHandler
  | typeof TerminalConsoleHandler =
  __POB_TARGET__ === 'browser' ? BrowserConsoleHandler : TerminalConsoleHandler;

export const logger = new Logger('app');
export const appLogger = logger;

if (__POB_TARGET__ !== 'browser') {
  Error.stackTraceLimit = Infinity;
  listenUnhandledErrors(logger);
}

const appMinLevel =
  __POB_TARGET__ !== 'browser' &&
  process.env.NIGHTINGALE_APP_MIN_LEVEL !== undefined &&
  process.env.NIGHTINGALE_APP_MIN_LEVEL !== ''
    ? Number(process.env.NIGHTINGALE_APP_MIN_LEVEL)
    : __DEV__
    ? Level.DEBUG
    : Level.INFO;

const libMinLevel =
  __POB_TARGET__ !== 'browser' &&
  process.env.NIGHTINGALE_LIB_MIN_LEVEL !== undefined &&
  process.env.NIGHTINGALE_LIB_MIN_LEVEL !== ''
    ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL)
    : Level.INFO;

configure(
  appMinLevel !== libMinLevel
    ? [
        {
          pattern: /^app(:|$)/,
          handlers: [new ConsoleHandler(appMinLevel)],
          stop: true,
        },
        {
          handlers: [new ConsoleHandler(libMinLevel)],
        },
      ]
    : [
        {
          handlers: [new ConsoleHandler(libMinLevel)],
        },
      ],
);
