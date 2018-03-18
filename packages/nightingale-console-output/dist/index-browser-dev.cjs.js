'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var levels = _interopDefault(require('nightingale-levels'));

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var index = (function () {
  if (console.error) {
    return function write(params, _ref2) {
      var _console;

      var level = _ref2.level;

      (_console = console)[level >= levels.ERROR ? 'error' : 'log'].apply(_console, toConsumableArray(params));
    };
  } else {
    return function write(params) {
      var _console2;

      (_console2 = console).log.apply(_console2, toConsumableArray(params));
    };
  }
})();

module.exports = index;
//# sourceMappingURL=index-browser-dev.cjs.js.map
