'use strict';

var _Logger = require('../../lib/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _StringHandler = require('../../lib/handlers/StringHandler');

var _StringHandler2 = _interopRequireDefault(_StringHandler);

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Logger: log method', () => {
    let stringHandler = new _StringHandler2.default(0);
    let logger = new _Logger2.default([stringHandler]);
    logger.log('log()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '→ log()\n');
}); /* global test */

test('Logger: info method', () => {
    let stringHandler = new _StringHandler2.default(0);
    let logger = new _Logger2.default([stringHandler]);
    logger.info('info()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '→ info()\n');
});

test('Logger: warn method', () => {
    let stringHandler = new _StringHandler2.default(0);
    let logger = new _Logger2.default([stringHandler]);
    logger.warn('warn()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '⚠ warn()\n');
});

test('Logger: error method', () => {
    let stringHandler = new _StringHandler2.default(0);
    let logger = new _Logger2.default([stringHandler]);
    logger.error('error()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '✖ error()\n');
});

test('Logger: alert method', () => {
    let stringHandler = new _StringHandler2.default(0);
    let logger = new _Logger2.default([stringHandler]);
    logger.alert('alert()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '‼ alert()\n');
});

test('Logger: fatal method', () => {
    let stringHandler = new _StringHandler2.default(0);
    let logger = new _Logger2.default([stringHandler]);
    logger.fatal('fatal()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '‼ fatal()\n');
});

test('Logger: debug method', () => {
    let stringHandler = new _StringHandler2.default(0);
    let logger = new _Logger2.default([stringHandler]);
    logger.debug('debug()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '• debug()\n');
});

test('Logger: success method', () => {
    let stringHandler = new _StringHandler2.default(0);
    let logger = new _Logger2.default([stringHandler]);
    logger.success('success()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '✔ success()\n');
});
//# sourceMappingURL=Logger.js.map