import { PRODUCTION, POB_TARGET } from 'pob-babel';
import { install as installSourceMapSupport } from 'source-map-support';
import Logger, { configure, addConfig, levels, listenUnhandledErrors } from 'nightingale';
import TerminalConsoleHandler from 'nightingale-console';
import BrowserConsoleHandler from 'nightingale-browser-console';

const ConsoleHandler = POB_TARGET === 'browser' ? BrowserConsoleHandler : TerminalConsoleHandler;

export { configure, addConfig, levels };

if (POB_TARGET !== 'browser' || !PRODUCTION) {
  installSourceMapSupport({
    environment: POB_TARGET === 'browser' ? 'browser' : 'node',
  });
}

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
          pattern: /^app(:.*)?$/,
          handlers: [new ConsoleHandler(levels.DEBUG)],
          stop: true,
        },
        {
          handlers: [new ConsoleHandler(levels.INFO)],
        },
      ]
    : [
        {
          handlers: [new ConsoleHandler(levels.INFO)],
        },
      ],
);
