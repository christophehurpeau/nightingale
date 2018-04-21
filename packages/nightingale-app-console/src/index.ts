import { install as installSourceMapSupport } from 'source-map-support';
import Logger, { configure, addConfig, levels, listenUnhandledErrors } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

export { configure, addConfig, levels };

if (process.env.POB_TARGET !== 'browser' || process.env.NODE_ENV !== 'production') {
  installSourceMapSupport({
    environment: process.env.POB_TARGET === 'browser' ? 'browser' : 'node',
  });
}

export const logger = new Logger('app');

if (process.env.POB_TARGET !== 'browser') {
  Error.stackTraceLimit = Infinity;
  listenUnhandledErrors(logger);
}

configure(
  process.env.NODE_ENV !== 'production'
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
