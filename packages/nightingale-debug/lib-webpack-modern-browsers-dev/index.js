import _t from 'tcomb-forked';
import levels from 'nightingale-levels';

var specialRegexpChars = /[\\^$+?.()|[\]{}]/;

var DebugValueType = _t.union([_t.String, RegExp, _t.list(_t.union([_t.String, RegExp]))], 'DebugValueType');

var createTestFunctionFromRegexpString = value => {
  if (!value.endsWith('/')) throw new Error('Invalid RegExp DEBUG value');
  var regexp = new RegExp(value.slice(1, -1));
  return string => regexp.test(string);
};

var createTestFunctionFromValue = value => {
  if (value.endsWith(':*')) {
    value = value.slice(0, -2);
    return string => string.startsWith(value);
  }

  return string => string === value;
};

export default function createFindDebugLevel(debugValue) {
  _assert(debugValue, _t.maybe(DebugValueType), 'debugValue');

  debugValue = debugValue || '';

  var wilcard = false;
  var debugValues = [];
  var skips = [];

  if (!Array.isArray(debugValue)) {
    debugValue = debugValue.trim();

    if (debugValue.startsWith('/')) {
      debugValues.push(createTestFunctionFromRegexpString(debugValue));
      debugValue = null;
    } else {
      debugValue = debugValue.split(/[\s,]+/);
    }
  }

  if (debugValue) {
    debugValue.forEach(value => {
      if (specialRegexpChars.test(value)) {
        throw new Error(`Invalid debug value: "${ value }" (contains special chars)`);
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
      return minLevel => levels.ALL;
    } else {
      return (minLevel, key) => skips.some(skip => skip(key)) ? minLevel : levels.ALL;
    }
  }

  if (debugValues.length === 0) {
    return minLevel => {
      _assert(minLevel, _t.Number, 'minLevel');

      return minLevel;
    };
  }

  return (minLevel, key) => {
    if (minLevel === levels.ALL || !key) {
      return minLevel;
    }

    if (debugValues.some(debugValue => debugValue(key))) {
      return skips.some(skip => skip(key)) ? minLevel : levels.ALL;
    }

    return minLevel;
  };
}

function _assert(x, type, name) {
  function message() {
    return 'Invalid value ' + _t.stringify(x) + ' supplied to ' + name + ' (expected a ' + _t.getTypeName(type) + ')';
  }

  if (_t.isType(type)) {
    if (!type.is(x)) {
      type(x, [name + ': ' + _t.getTypeName(type)]);

      _t.fail(message());
    }
  } else if (!(x instanceof type)) {
    _t.fail(message());
  }

  return x;
}
//# sourceMappingURL=index.js.map