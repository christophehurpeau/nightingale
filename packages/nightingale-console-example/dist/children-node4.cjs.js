'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var ConsoleHandler = _interopDefault(require('nightingale-console'));

Logger.configure([{
  handlers: [new ConsoleHandler(Logger.Level.INFO)]
}]);
var nightingaleLogger = new Logger__default('nightingale');
nightingaleLogger.setContext({
  nightingale: true
});
nightingaleLogger.info('test');
var logger = nightingaleLogger.child('console');
logger.setContext({
  nightingaleConsole: true
});
logger.info('test');
//# sourceMappingURL=children-node4.cjs.js.map
