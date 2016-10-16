import Logger, { configure, levels, listenUnhandledErrors } from 'nightingale/src';
import ConsoleHandler from 'nightingale-console/src';
import errorProcessor from 'nightingale-error-processor/src';

export * from 'nightingale';

export const logger = new Logger('app');

listenUnhandledErrors(logger);

configure([
  {
    processors: [errorProcessor],
  },
  !PRODUCTION && {
    pattern: /^app.*$/,
    handlers: [new ConsoleHandler(levels.DEBUG)],
    stop: true,
  },
  {
    handlers: [new ConsoleHandler(levels.INFO)],
  },
].filter(Boolean));
