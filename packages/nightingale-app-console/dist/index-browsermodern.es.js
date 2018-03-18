import Logger, { configure, addConfig, levels } from 'nightingale';
export { configure, addConfig, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

const logger = new Logger('app');

configure([false, {
  handlers: [new ConsoleHandler(levels.INFO)]
}].filter(Boolean));

export { logger };
//# sourceMappingURL=index-browsermodern.es.js.map
