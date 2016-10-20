'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
  if (console.error) {
    return function write(params, _ref) {
      var _console;

      var level = _ref.level;

      (_console = console)[level >= _nightingaleLevels2.default.ERROR ? 'error' : 'log'].apply(_console, _toConsumableArray(params));
    };
  } else {
    return function write(params) {
      var _console2;

      (_console2 = console).log.apply(_console2, _toConsumableArray(params));
    };
  }
}();
//# sourceMappingURL=index.js.map