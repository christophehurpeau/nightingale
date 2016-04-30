'use strict';

var _ = require('../../');

var _2 = _interopRequireDefault(_);

var _assert = require('assert');

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test */


test('Logger: log method', () => {
    const key = 'test';
    let logger = new _2.default(key);
    (0, _assert.strictEqual)(logger.key, key);
});
//# sourceMappingURL=test.js.map