'use strict';

var _assert = require('assert');

var _ = require('../../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test */
test('style: blue bold color', () => {
  (0, _assert.strictEqual)((0, _.style)(['blue', 'bold'], 'test'), '*test*');
});

test('format simple message', () => {
  (0, _assert.strictEqual)((0, _2.default)({ message: 'test' }), 'test');
});
//# sourceMappingURL=index.js.map