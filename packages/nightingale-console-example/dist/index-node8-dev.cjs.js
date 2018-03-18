'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var ConsoleHandler = _interopDefault(require('nightingale-console'));

Logger.configure([{ handlers: [new ConsoleHandler(Logger.levels.INFO)] }]);

const logger = new Logger__default('nightingale:console');

logger.debug('test');
logger.info('test');
logger.warn('test');
//# sourceMappingURL=index-node8-dev.cjs.js.map
