import { install as installSourceMapSupport } from 'source-map-support';
import Logger, { configure, addConfig, levels, listenUnhandledErrors } from 'nightingale/src';
import ConsoleHandler from 'nightingale-console/src';

export { configure, addConfig, levels };

if (!BROWSER || !PRODUCTION) {
  installSourceMapSupport({
    environment: BROWSER ? 'browser' : 'node',
  });
}

export const logger = new Logger('app');

if (!BROWSER) {
  Error.stackTraceLimit = Infinity;
  listenUnhandledErrors(logger);
}

configure(
  [
    !PRODUCTION && {
      pattern: /^app(:.*)?$/,
      handlers: [new ConsoleHandler(levels.DEBUG)],
      stop: true,
    },
    {
      handlers: [new ConsoleHandler(levels.INFO)],
    },
  ].filter(Boolean),
);
