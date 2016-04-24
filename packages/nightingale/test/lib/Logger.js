'use strict';

var _lib = require('../../lib');

var _lib2 = _interopRequireDefault(_lib);

var _nightingaleString = require('nightingale-string');

var _nightingaleString2 = _interopRequireDefault(_nightingaleString);

var _assert = require('assert');

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Logger: log method', () => {
    let stringHandler = new _nightingaleString2.default(_lib.levels.ALL);
    (0, _lib.configure)([{ handlers: [stringHandler] }]);
    let logger = new _lib2.default();
    logger.log('log()');
    (0, _assert.strictEqual)(stringHandler.string.substr(9), '→ log()\n');
}); /* global test */

test('Logger: info method', () => {
    let stringHandler = new _nightingaleString2.default(_lib.levels.ALL);
    (0, _lib.configure)([{ handlers: [stringHandler] }]);
    let logger = new _lib2.default();
    logger.info('info()');
    (0, _assert.strictEqual)(stringHandler.string.substr(9), '→ info()\n');
});

test('Logger: warn method', () => {
    let stringHandler = new _nightingaleString2.default(_lib.levels.ALL);
    (0, _lib.configure)([{ handlers: [stringHandler] }]);
    let logger = new _lib2.default();
    logger.warn('warn()');
    (0, _assert.strictEqual)(stringHandler.string.substr(9), '⚠ warn()\n');
});

test('Logger: error method', () => {
    let stringHandler = new _nightingaleString2.default(_lib.levels.ALL);
    (0, _lib.configure)([{ handlers: [stringHandler] }]);
    let logger = new _lib2.default();
    logger.error('error()');
    (0, _assert.strictEqual)(stringHandler.string.substr(9), '✖ error()\n');
});

test('Logger: alert method', () => {
    let stringHandler = new _nightingaleString2.default(_lib.levels.ALL);
    (0, _lib.configure)([{ handlers: [stringHandler] }]);
    let logger = new _lib2.default();
    logger.alert('alert()');
    (0, _assert.strictEqual)(stringHandler.string.substr(9), '‼ alert()\n');
});

test('Logger: fatal method', () => {
    let stringHandler = new _nightingaleString2.default(_lib.levels.ALL);
    (0, _lib.configure)([{ handlers: [stringHandler] }]);
    let logger = new _lib2.default();
    logger.fatal('fatal()');
    (0, _assert.strictEqual)(stringHandler.string.substr(9), '‼ fatal()\n');
});

test('Logger: debug method', () => {
    let stringHandler = new _nightingaleString2.default(_lib.levels.ALL);
    (0, _lib.configure)([{ handlers: [stringHandler] }]);
    let logger = new _lib2.default();
    logger.debug('debug()');
    (0, _assert.strictEqual)(stringHandler.string.substr(9), '• debug()\n');
});

test('Logger: success method', () => {
    let stringHandler = new _nightingaleString2.default(_lib.levels.ALL);
    (0, _lib.configure)([{ handlers: [stringHandler] }]);
    let logger = new _lib2.default();
    logger.success('success()');
    (0, _assert.strictEqual)(stringHandler.string.substr(9), '✔ success()\n');
});
//# sourceMappingURL=Logger.js.map