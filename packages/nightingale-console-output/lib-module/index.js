function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import levels from 'nightingale-levels';

export default (function () {
  if (console.error) {
    return function write(params, _ref2) {
      var _console;

      var level = _ref2.level;

      (_console = console)[level >= levels.ERROR ? 'error' : 'log'].apply(_console, _toConsumableArray(params));
    };
  } else {
    return function write(params) {
      var _console2;

      (_console2 = console).log.apply(_console2, _toConsumableArray(params));
    };
  }
})();
//# sourceMappingURL=index.js.map