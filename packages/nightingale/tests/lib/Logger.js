/* global test */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

var _libLogger = require('../../lib/Logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

var _libHandlersStringHandler = require('../../lib/handlers/StringHandler');

var _libHandlersStringHandler2 = _interopRequireDefault(_libHandlersStringHandler);

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

test('Logger: log method', function () {
    let stringHandler = new _libHandlersStringHandler2.default(0);
    let logger = new _libLogger2.default([stringHandler]);
    logger.log('log()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '→ log()\n');
});

test('Logger: info method', function () {
    let stringHandler = new _libHandlersStringHandler2.default(0);
    let logger = new _libLogger2.default([stringHandler]);
    logger.info('info()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '→ info()\n');
});

test('Logger: warn method', function () {
    let stringHandler = new _libHandlersStringHandler2.default(0);
    let logger = new _libLogger2.default([stringHandler]);
    logger.warn('warn()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '⚠ warn()\n');
});

test('Logger: error method', function () {
    let stringHandler = new _libHandlersStringHandler2.default(0);
    let logger = new _libLogger2.default([stringHandler]);
    logger.error('error()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '✖ error()\n');
});

test('Logger: alert method', function () {
    let stringHandler = new _libHandlersStringHandler2.default(0);
    let logger = new _libLogger2.default([stringHandler]);
    logger.alert('alert()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '‼ alert()\n');
});

test('Logger: fatal method', function () {
    let stringHandler = new _libHandlersStringHandler2.default(0);
    let logger = new _libLogger2.default([stringHandler]);
    logger.fatal('fatal()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '‼ fatal()\n');
});

test('Logger: debug method', function () {
    let stringHandler = new _libHandlersStringHandler2.default(0);
    let logger = new _libLogger2.default([stringHandler]);
    logger.debug('debug()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '• debug()\n');
});

test('Logger: success method', function () {
    let stringHandler = new _libHandlersStringHandler2.default(0);
    let logger = new _libLogger2.default([stringHandler]);
    logger.success('success()');
    _proclaim2.default.strictEqual(stringHandler.string.substr(9), '✔ success()\n');
});
//# sourceMappingURL=Logger.js.map