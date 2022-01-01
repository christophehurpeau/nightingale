'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingaleLevels = require('nightingale-levels');

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
  var isWildcard = false;
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
        throw new Error("Invalid debug value: \"" + value + "\" (contains special chars)");
      }

      if (!value) return;

      if (value === '*') {
        isWildcard = true;
        return;
      }

      if (value.startsWith('-')) {
        skips.push(createTestFunctionFromValue(value.slice(1)));
      } else if (!isWildcard) {
        debugValues.push(createTestFunctionFromValue(value));
      }
    });
  }

  if (isWildcard) {
    if (skips.length === 0) {
      return function () {
        return nightingaleLevels.Level.ALL;
      };
    } else {
      return function (minLevel, key) {
        return skips.some(function (skip) {
          return skip(key);
        }) ? minLevel : nightingaleLevels.Level.ALL;
      };
    }
  }

  if (debugValues.length === 0) {
    return function (minLevel) {
      return minLevel;
    };
  }

  return function (minLevel, key) {
    if (minLevel === nightingaleLevels.Level.ALL || !key) {
      return minLevel;
    }

    if (debugValues.some(function (dv) {
      return dv(key);
    })) {
      return skips.some(function (skip) {
        return skip(key);
      }) ? minLevel : nightingaleLevels.Level.ALL;
    }

    return minLevel;
  };
}

exports.createFindDebugLevel = createFindDebugLevel;
//# sourceMappingURL=index-browser.cjs.js.map
