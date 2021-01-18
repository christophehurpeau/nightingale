import { PRODUCTION, POB_TARGET } from 'pob-babel';
import Logger, {
  configure,
  addConfig,
  Level,
  levels,
  listenUnhandledErrors,
} from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';
import TerminalConsoleHandler from 'nightingale-console';

const ConsoleHandler =
  POB_TARGET === 'browser' ? BrowserConsoleHandler : TerminalConsoleHandler;

export { configure, addConfig, Level, levels };

export const logger = new Logger('app');
export const appLogger = logger;

if (POB_TARGET !== 'browser') {
  Error.stackTraceLimit = Infinity;
  listenUnhandledErrors(logger);
}

configure(
  !PRODUCTION
    ? [
        {
          pattern: /^app(:|$)/,
          handlers: [new ConsoleHandler(Level.DEBUG)],
          stop: true,
        },
        {
          handlers: [new ConsoleHandler(Level.INFO)],
        },
      ]
    : [
        {
          handlers: [new ConsoleHandler(Level.INFO)],
        },
      ],
);
