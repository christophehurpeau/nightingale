'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingale = require('nightingale');
const nightingaleConsole = require('nightingale-console');

const testMinLevel = process.env.NIGHTINGALE_TEST_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_TEST_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_TEST_MIN_LEVEL) : process.env.NODE_ENV !== "production" ? nightingale.Level.DEBUG : nightingale.Level.INFO;
const libMinLevel = process.env.NIGHTINGALE_LIB_MIN_LEVEL !== undefined && process.env.NIGHTINGALE_LIB_MIN_LEVEL !== '' ? Number(process.env.NIGHTINGALE_LIB_MIN_LEVEL) : nightingale.Level.INFO;
const testLogger = new nightingale.Logger('unit-testing');
nightingale.configure([{
  pattern: /^app(:|$)/,
  handlers: [new nightingaleConsole.ConsoleHandler(testMinLevel)],
  stop: true
}, {
  handlers: [new nightingaleConsole.ConsoleHandler(libMinLevel)]
}]);

exports.Level = nightingale.Level;
exports.Logger = nightingale.Logger;
exports.addConfig = nightingale.addConfig;
exports.configure = nightingale.configure;
exports.levels = nightingale.levels;
exports.testLogger = testLogger;
//# sourceMappingURL=index-node14.cjs.js.map
