import 'pob-babel';
import { install as installSourceMapSupport } from 'source-map-support';
import Logger, { configure, addConfig, levels, listenUnhandledErrors } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

export { configure, addConfig, levels };

if (POB_TARGET !== 'browser' || POB_ENV !== 'production') {
  installSourceMapSupport({
    environment: POB_TARGET === 'browser' ? 'browser' : 'node',
  });
}

export const logger = new Logger('app');

if (POB_TARGET !== 'browser') {
  Error.stackTraceLimit = Infinity;
  listenUnhandledErrors(logger);
}

configure(
  POB_ENV !== 'production'
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
