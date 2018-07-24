'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var ConsoleHandler = _interopDefault(require('nightingale-console'));

Logger.configure([{
  handlers: [new ConsoleHandler(Logger.Level.ALL)]
}]);
const logger = new Logger__default('app');
logger.error(new Error('test'));
logger.error('test', {
  error: new Error('test')
});
//# sourceMappingURL=errors-node6-dev.cjs.js.map
