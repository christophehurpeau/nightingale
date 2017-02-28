'use strict';

var _assert = require('assert');

var _ = require('../../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test */
test('style: blue bold color', () => {
  const args = [];
  (0, _assert.strictEqual)((0, _.style)(args)(['blue', 'bold'], 'test'), '%ctest%c');
  (0, _assert.deepStrictEqual)(args, ['color: #4682B4; font-weight: bold', 'color: initial; font-weight: normal']);
});

test('format simple message', () => {
  const [string, args] = (0, _2.default)({ message: 'test' });
  (0, _assert.strictEqual)(string, 'test');
  (0, _assert.deepStrictEqual)(args, []);
});
//# sourceMappingURL=index.js.map