'use strict';

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _nightingaleHandler = require('nightingale-handler');

var _nightingaleHandler2 = _interopRequireDefault(_nightingaleHandler);

var _nightingaleJsonFormatter = require('nightingale-json-formatter');

var _nightingaleJsonFormatter2 = _interopRequireDefault(_nightingaleJsonFormatter);

var _nightingaleConsoleOutput = require('nightingale-console-output');

var _nightingaleConsoleOutput2 = _interopRequireDefault(_nightingaleConsoleOutput);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _.configure)([{
    handlers: [new _nightingaleHandler2.default(_.levels.ALL, _nightingaleJsonFormatter2.default, _nightingaleConsoleOutput2.default)]
}]);

const logger = new _2.default('app');

logger.log('test');

const timeStarted = logger.time();
setTimeout(logger.timeEnd(timeStarted), 2000);

logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
//# sourceMappingURL=jsonConsoleTest.js.map