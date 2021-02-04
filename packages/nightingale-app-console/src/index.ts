import { PRODUCTION, POB_TARGET } from 'pob-babel';
import {
  Logger,
  configure,
  Level,
  levels,
  listenUnhandledErrors,
} from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';
import { ConsoleHandler as TerminalConsoleHandler } from 'nightingale-console';

export { configure, addConfig } from 'nightingale';

export const ConsoleHandler:
  | typeof BrowserConsoleHandler
  | typeof TerminalConsoleHandler =
  POB_TARGET === 'browser' ? BrowserConsoleHandler : TerminalConsoleHandler;

export { Level, levels };

export const logger = new Logger('app');
export const appLogger = logger;

if (POB_TARGET !== 'browser') {
  Error.stackTraceLimit = Infinity;
  listenUnhandledErrors(logger);
}

const appMinLevel =
  POB_TARGET !== 'browser' &&
  process.env.NIGHTINGALE_APP_MIN_LEVEL === undefined
    ? Number(process.env.NIGHTINGALE_APP_MIN_LEVEL)
    : // eslint-disable-next-line unicorn/no-nested-ternary
    PRODUCTION
    ? Level.INFO
    : Level.DEBUG;

const libMinLevel =
  POB_TARGET !== 'browser' &&
  process.env.NIGHTINGALE_LIB_MIN_LEVEL === undefined
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
