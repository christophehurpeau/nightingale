import { install as installSourceMapSupport } from 'source-map-support';
import Logger, { configure, addConfig, levels, listenUnhandledErrors } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

export { configure, addConfig, levels };

installSourceMapSupport({
  environment: 'browser'
});


export var logger = new Logger('app');

configure([{
  pattern: /^app(:.*)?$/,
  handlers: [new ConsoleHandler(levels.DEBUG)],
  stop: true
}, {
  handlers: [new ConsoleHandler(levels.INFO)]
}].filter(Boolean));
//# sourceMappingURL=index.js.map