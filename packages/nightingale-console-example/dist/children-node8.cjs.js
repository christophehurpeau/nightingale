'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const Logger = require('nightingale');
const Logger__default = _interopDefault(Logger);
const ConsoleHandler = _interopDefault(require('nightingale-console'));

Logger.configure([{
  handlers: [new ConsoleHandler(Logger.Level.INFO)]
}]);
const nightingaleLogger = new Logger__default('nightingale');
nightingaleLogger.setContext({
  nightingale: true
});
nightingaleLogger.info('test');
const logger = nightingaleLogger.child('console');
logger.setContext({
  nightingaleConsole: true
});
logger.info('test');
//# sourceMappingURL=children-node8.cjs.js.map
