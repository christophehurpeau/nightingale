'use strict';

var _assert = require('assert');

var _ = require('../../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test */
test('key argument', () => {
    const key = 'test';
    let logger = new _2.default(key);
    (0, _assert.strictEqual)(logger.key, key);
});
//# sourceMappingURL=index.js.map