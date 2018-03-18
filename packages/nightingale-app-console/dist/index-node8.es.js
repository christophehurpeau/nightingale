import { install } from 'source-map-support';
import Logger, { configure, addConfig, levels, listenUnhandledErrors } from 'nightingale';
export { configure, addConfig, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

install({
  environment: 'node'
});


const logger = new Logger('app');

Error.stackTraceLimit = Infinity;
listenUnhandledErrors(logger);


configure([false, {
  handlers: [new ConsoleHandler(levels.INFO)]
}].filter(Boolean));

export { logger };
//# sourceMappingURL=index-node8.es.js.map
