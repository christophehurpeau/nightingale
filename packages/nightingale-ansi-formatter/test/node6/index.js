'use strict';

var _ = require('../../');

var _2 = _interopRequireDefault(_);

var _assert = require('assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test */


test('style: blue bold color', () => {
    (0, _assert.strictEqual)((0, _.style)(['blue', 'bold'], 'test'), '\x1b[1m\x1b[34mtest\x1b[39m\x1b[22m');
});

test('format simple message', () => {
    (0, _assert.strictEqual)((0, _2.default)({ message: 'test' }), 'test');
});
//# sourceMappingURL=index.js.map