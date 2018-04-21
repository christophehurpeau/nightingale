import { install } from 'source-map-support';
import Logger, { configure, addConfig, levels, listenUnhandledErrors } from 'nightingale';
export { configure, addConfig, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

if (process.env.POB_TARGET !== 'browser' || process.env.NODE_ENV !== 'production') {
  install({
    environment: process.env.POB_TARGET === 'browser' ? 'browser' : 'node'
  });
}

var logger = new Logger('app');

if (process.env.POB_TARGET !== 'browser') {
  Error.stackTraceLimit = Infinity;
  listenUnhandledErrors(logger);
}

configure(process.env.NODE_ENV !== 'production' ? [{
  pattern: /^app(:.*)?$/,
  handlers: [new ConsoleHandler(levels.DEBUG)],
  stop: true
}, {
  handlers: [new ConsoleHandler(levels.INFO)]
}] : [{
  handlers: [new ConsoleHandler(levels.INFO)]
}]);

export { logger };
//# sourceMappingURL=index-browser.es.js.map
