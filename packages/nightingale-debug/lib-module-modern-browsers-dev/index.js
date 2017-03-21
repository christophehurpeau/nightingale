import levels from 'nightingale-levels';

import t from 'flow-runtime';
const specialRegexpChars = /[\\^$+?.()|[\]{}]/;

const DebugValueType = t.type('DebugValueType', t.union(t.string(), t.ref('RegExp'), t.array(t.union(t.string(), t.ref('RegExp')))));


const createTestFunctionFromRegexpString = function createTestFunctionFromRegexpString(value) {
  if (!value.endsWith('/')) throw new Error('Invalid RegExp DEBUG value');
  const regexp = new RegExp(value.slice(1, -1));
  return function (string) {
    return regexp.test(string);
  };
};

const createTestFunctionFromValue = function createTestFunctionFromValue(value) {
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

export default function createFindDebugLevel(debugValue) {
  let _debugValueType = t.nullable(DebugValueType);

  t.param('debugValue', _debugValueType).assert(debugValue);

  debugValue = _debugValueType.assert(debugValue || '');

  let wilcard = false;
  const debugValues = [];
  const skips = [];

  if (!Array.isArray(debugValue)) {
    debugValue = _debugValueType.assert(debugValue.trim());

    if (debugValue.startsWith('/')) {
      debugValues.push(createTestFunctionFromRegexpString(debugValue));
      debugValue = _debugValueType.assert(null);
    } else {
      debugValue = _debugValueType.assert(debugValue.split(/[\s,]+/));
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
        skips.push(createTestFunctionFromValue(value.substr(1)));
      } else if (!wilcard) {
        debugValues.push(createTestFunctionFromValue(value));
      }
    });
  }

  if (wilcard) {
    if (skips.length === 0) {
      return function () {
        return levels.ALL;
      };
    } else {
      return function (minLevel, key) {
        return skips.some(function (skip) {
          return skip(key);
        }) ? minLevel : levels.ALL;
      };
    }
  }

  if (debugValues.length === 0) {
    return function (minLevel) {
      let _minLevelType = t.number();

      t.param('minLevel', _minLevelType).assert(minLevel);
      return minLevel;
    };
  }

  return function (minLevel, key) {
    if (minLevel === levels.ALL || !key) {
      return minLevel;
    }

    if (debugValues.some(function (debugValue) {
      return debugValue(key);
    })) {
      return skips.some(function (skip) {
        return skip(key);
      }) ? minLevel : levels.ALL;
    }

    return minLevel;
  };
}
//# sourceMappingURL=index.js.map