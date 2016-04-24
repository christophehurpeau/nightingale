'use strict';

var _ = require('../../');

var _2 = _interopRequireDefault(_);

var _assert = require('assert');

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('blue bold color', () => {
    (0, _assert.strictEqual)((0, _.style)(['blue', 'bold'], 'test'), '<span style="color: #4682B4; font-weight: bold">test</span>');
});

test('format simple message', () => {
    (0, _assert.strictEqual)((0, _2.default)({ message: 'test' }), '<div>test</div>\n');
});
//# sourceMappingURL=test.js.map