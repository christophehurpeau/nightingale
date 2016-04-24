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
}, {
    patterns: ['app'],
    handlers: [new _nightingaleConsole2.default(_.levels.DEBUG)]
}, {
    patterns: ['app.service.**'],
    handlers: [new _nightingaleConsole2.default(_.levels.INFO)]
}]);

const smthg = new _2.default('smthg');
const app = new _2.default('app');
const appService = new _2.default('app.service.myService.insideMyService');

smthg.trace('shoud appear 1');
app.trace('shoud notappear');
app.info('shoud appear 2');
appService.trace('shoud not appear');
appService.debug('shoud not appear');
appService.info('shoud appear 3');
//# sourceMappingURL=configureTest.js.map