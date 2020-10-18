'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Level = require('nightingale-levels');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var Level__default = /*#__PURE__*/_interopDefaultLegacy(Level);

/* eslint-disable complexity */
var specialRegexpChars = /[$()+.?[\\\]^{|}]/;

var createTestFunctionFromRegexp = function createTestFunctionFromRegexp(regexp) {
  return function (string) {
    return regexp.test(string);
  };
};

var createTestFunctionFromRegexpString = function createTestFunctionFromRegexpString(value) {
  if (!value.endsWith('/')) throw new Error('Invalid RegExp DEBUG value');
  return createTestFunctionFromRegexp(new RegExp(value.slice(1, -1)));
};

var createTestFunctionFromValue = function createTestFunctionFromValue(value) {
  if (value.endsWith(':*')) {
    value = value.slice(0, -2);
    return function (string) {
      return string.startsWith(value);
    };
  }

  return function (string) {
    return string === value;
  };
};

function createFindDebugLevel(debugValue) {
  var wilcard = false;
  var debugValues = [];
  var skips = [];

  if (!Array.isArray(debugValue)) {
    if (debugValue instanceof RegExp) {
      debugValues.push(createTestFunctionFromRegexp(debugValue));
      debugValue = undefined;
    } else if (debugValue) {
      debugValue = debugValue.trim();

      if (debugValue.startsWith('/')) {
        debugValues.push(createTestFunctionFromRegexpString(debugValue));
        debugValue = undefined;
      } else {
        debugValue = debugValue.split(/[\s,]+/);
      }
    }
  }

  if (debugValue) {
    debugValue.forEach(function (value) {
      if (specialRegexpChars.test(value)) {
        throw new Error(`Invalid debug value: "${value}" (contains special chars)`);
      }

      if (!value) return;

      if (value === '*') {
        wilcard = true;
        return;
      }

      if (value.startsWith('-')) {
        skips.push(createTestFunctionFromValue(value.slice(1)));
      } else if (!wilcard) {
        debugValues.push(createTestFunctionFromValue(value));
      }
    });
  }

  if (wilcard) {
    if (skips.length === 0) {
      return function () {
        return Level__default.ALL;
      };
    } else {
      return function (minLevel, key) {
        return skips.some(function (skip) {
          return skip(key);
        }) ? minLevel : Level__default.ALL;
      };
    }
  }

  if (debugValues.length === 0) {
    return function (minLevel) {
      return minLevel;
    };
  }

  return function (minLevel, key) {
    if (minLevel === Level__default.ALL || !key) {
      return minLevel;
    }

    if (debugValues.some(function (debugValue) {
      return debugValue(key);
    })) {
      return skips.some(function (skip) {
        return skip(key);
      }) ? minLevel : Level__default.ALL;
    }

    return minLevel;
  };
}

exports.default = createFindDebugLevel;
//# sourceMappingURL=index-browser-dev.cjs.js.map
