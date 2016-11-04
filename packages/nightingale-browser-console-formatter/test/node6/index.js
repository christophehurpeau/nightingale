'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* global test */


var _assert = require('assert');

var _ = require('../../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('style: blue bold color', () => {
  const args = [];
  (0, _assert.strictEqual)((0, _.style)(args)(['blue', 'bold'], 'test'), '%ctest%c');
  (0, _assert.deepStrictEqual)(args, ['color: #4682B4; font-weight: bold', 'color: initial; font-weight: normal']);
});

test('format simple message', () => {
  var _format = (0, _2.default)({ message: 'test' }),
      _format2 = _slicedToArray(_format, 2);

  const string = _format2[0],
        args = _format2[1];

  (0, _assert.strictEqual)(string, 'test');
  (0, _assert.deepStrictEqual)(args, []);
});
//# sourceMappingURL=index.js.map