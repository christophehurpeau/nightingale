import { Level, Logger, configure } from 'nightingale';
export { Level, Logger, addConfig, configure, levels } from 'nightingale';
import { ConsoleHandler } from 'nightingale-console';

const testMinLevel = process.env.NIGHTINGALE_TEST_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_TEST_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_TEST_MIN_LEVEL) : process.env.NODE_ENV !== 'production' ? Level.DEBUG : Level.INFO;
const libMinLevel = process.env.NIGHTINGALE_LIB_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL) : Level.INFO;
const testLogger = new Logger('unit-testing');
configure([{
  pattern: /^unit-testing(:|$)/,
  handlers: [new ConsoleHandler(testMinLevel)],
  stop: true
}, {
  handlers: [new ConsoleHandler(libMinLevel)]
}]);

export { testLogger };
//# sourceMappingURL=index-node18.mjs.map
