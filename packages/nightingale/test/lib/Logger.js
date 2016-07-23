'use strict';

var _assert = require('assert');

var _nightingaleString = require('nightingale-string');

var _nightingaleString2 = _interopRequireDefault(_nightingaleString);

var _lib = require('../../lib');

var _lib2 = _interopRequireDefault(_lib);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let TestableStringLogger = class TestableStringLogger extends _lib2.default {
    constructor() {
        super('');
        this.stringHandler = new _nightingaleString2.default(_lib.levels.ALL);
    }

    getConfig() {
        return {
            handlers: [this.stringHandler],
            processors: []
        };
    }

    /**
     * @member string
    */get string() {
        return this.stringHandler.string;
    }
}; /* global test */
/* eslint import/no-extraneous-dependencies: 'off' */

test('Logger: log method', () => {
    let logger = new TestableStringLogger();
    logger.log('log()');
    (0, _assert.strictEqual)(logger.string.substr(9), '→ log()\n');
});

test('Logger: info method', () => {
    let logger = new TestableStringLogger();
    logger.info('info()');
    (0, _assert.strictEqual)(logger.string.substr(9), '→ info()\n');
});

test('Logger: warn method', () => {
    let logger = new TestableStringLogger();
    logger.warn('warn()');
    (0, _assert.strictEqual)(logger.string.substr(9), '⚠ warn()\n');
});

test('Logger: error method', () => {
    let logger = new TestableStringLogger();
    logger.error('error()');
    (0, _assert.strictEqual)(logger.string.substr(9), '✖ error()\n');
});

test('Logger: alert method', () => {
    let logger = new TestableStringLogger();
    logger.alert('alert()');
    (0, _assert.strictEqual)(logger.string.substr(9), '‼ alert()\n');
});

test('Logger: fatal method', () => {
    let logger = new TestableStringLogger();
    logger.fatal('fatal()');
    (0, _assert.strictEqual)(logger.string.substr(9), '‼ fatal()\n');
});

test('Logger: debug method', () => {
    let logger = new TestableStringLogger();
    logger.debug('debug()');
    (0, _assert.strictEqual)(logger.string.substr(9), '• debug()\n');
});

test('Logger: success method', () => {
    let logger = new TestableStringLogger();
    logger.success('success()');
    (0, _assert.strictEqual)(logger.string.substr(9), '✔ success()\n');
});
//# sourceMappingURL=Logger.js.map