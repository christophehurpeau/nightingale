
import Logger, { configure, addConfig, levels, listenUnhandledErrors } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

export { configure, addConfig, levels };

export var logger = new Logger('app');

configure([false, {
  handlers: [new ConsoleHandler(levels.INFO)]
}].filter(Boolean));
//# sourceMappingURL=index.js.map