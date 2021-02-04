'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const Level = require('nightingale-levels');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const Level__default = /*#__PURE__*/_interopDefaultLegacy(Level);

/* eslint-disable complexity */
const specialRegexpChars = /[$()+.?[\\\]^{|}]/;

const createTestFunctionFromRegexp = regexp => string => regexp.test(string);

const createTestFunctionFromRegexpString = value => {
  if (!value.endsWith('/')) throw new Error('Invalid RegExp DEBUG value');
  return createTestFunctionFromRegexp(new RegExp(value.slice(1, -1)));
};

const createTestFunctionFromValue = value => {
  if (value.endsWith(':*')) {
    value = value.slice(0, -2);
    return string => string.startsWith(value);
  }

  return string => string === value;
};

function createFindDebugLevel(debugValue) {
  let isWildcard = false;
  const debugValues = [];
  const skips = [];

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
    debugValue.forEach(value => {
      if (specialRegexpChars.test(value)) {
        throw new Error(`Invalid debug value: "${value}" (contains special chars)`);
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
      return () => Level__default.ALL;
    } else {
      return (minLevel, key) => skips.some(skip => skip(key)) ? minLevel : Level__default.ALL;
    }
  }

  if (debugValues.length === 0) {
    return minLevel => minLevel;
  }

  return (minLevel, key) => {
    if (minLevel === Level__default.ALL || !key) {
      return minLevel;
    }

    if (debugValues.some(debugValue => debugValue(key))) {
      return skips.some(skip => skip(key)) ? minLevel : Level__default.ALL;
    }

    return minLevel;
  };
}

exports.createFindDebugLevel = createFindDebugLevel;
exports.default = createFindDebugLevel;
//# sourceMappingURL=index-node12.cjs.js.map
