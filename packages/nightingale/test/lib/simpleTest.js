'use strict';

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _nightingaleConsole = require('nightingale-console');

var _nightingaleConsole2 = _interopRequireDefault(_nightingaleConsole);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _.configure)([{
    handlers: [new _nightingaleConsole2.default(_.levels.ALL)]
}]);

const logger = new _2.default('app');

logger.log('test', { test: 'test', obj: { val: 1000 } });

const timeStarted = logger.time();
setTimeout(logger.timeEnd(timeStarted), 2000);

logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
//# sourceMappingURL=simpleTest.js.map