'use strict';

var _ConsoleHandler = require('../../lib/handlers/ConsoleHandler');

var _ConsoleHandler2 = _interopRequireDefault(_ConsoleHandler);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Logger = require('../../lib/node').Logger;
const LogLevel = require('../../lib/node').LogLevel;


const logger = new Logger([new _ConsoleHandler2.default(LogLevel.TRACE)]);

logger.log.call(null, 'test');

logger.time('test');
setTimeout(logger.timeEnd.bind(null, 'test'), 200);

const timeStarted = logger.time();
setTimeout(logger.timeEnd.bind(null, timeStarted), 2000);

logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
//# sourceMappingURL=simpleTest.js.map