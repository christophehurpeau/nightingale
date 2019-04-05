'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const Logger = require('nightingale');
const Logger__default = _interopDefault(Logger);
const ConsoleHandler = _interopDefault(require('nightingale-console'));

Logger.configure([{
  handlers: [new ConsoleHandler(Logger.Level.INFO)]
}]);
const logger = new Logger__default('nightingale:console');
logger.debug('test');
logger.info('test');
logger.warn('test');
//# sourceMappingURL=index-node8-dev.cjs.js.map
