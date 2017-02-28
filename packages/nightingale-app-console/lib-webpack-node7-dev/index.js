import Logger, { configure, addConfig, levels, listenUnhandledErrors } from 'nightingale';
import ConsoleHandler from 'nightingale-console';
import errorProcessor from 'nightingale-error-processor';

export { configure, addConfig, levels };

export const logger = new Logger('app');

Error.stackTraceLimit = Infinity;
listenUnhandledErrors(logger);

configure([{
  processors: [errorProcessor]
}, {
  pattern: /^app(:.*)?$/,
  handlers: [new ConsoleHandler(levels.DEBUG)],
  stop: true
}, {
  handlers: [new ConsoleHandler(levels.INFO)]
}].filter(Boolean));
//# sourceMappingURL=index.js.map