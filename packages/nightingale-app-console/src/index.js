import Logger, { configure, addConfig, levels, listenUnhandledErrors } from 'nightingale/src';
import ConsoleHandler from 'nightingale-console/src';
import errorProcessor from 'nightingale-error-processor/src';

export { configure, addConfig, levels };

export const logger = new Logger('app');

Error.stackTraceLimit = Infinity;
listenUnhandledErrors(logger);

configure([
  {
    processors: [errorProcessor],
  },
  !PRODUCTION && {
    pattern: /^app(:.*)?$/,
    handlers: [new ConsoleHandler(levels.DEBUG)],
    stop: true,
  },
  {
    handlers: [new ConsoleHandler(levels.INFO)],
  },
].filter(Boolean));
