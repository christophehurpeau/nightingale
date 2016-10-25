import _t from 'tcomb-forked';
import levels from 'nightingale-levels';

var specialRegexpChars = /[\\^$+?.()|[\]{}]/;

var DebugValueType = _t.union([_t.String, RegExp, _t.list(_t.union([_t.String, RegExp]))], 'DebugValueType');

var createTestFunctionFromRegexpString = function createTestFunctionFromRegexpString(value) {
  if (!value.endsWith('/')) throw new Error('Invalid RegExp DEBUG value');
  var regexp = new RegExp(value.slice(1, -1));
  return function (string) {
    return regexp.test(string);
  };
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
    debugValue.forEach(function (value) {
      if (specialRegexpChars.test(value)) {
        throw new Error('Invalid debug value: "' + value + '" (contains special chars)');
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
      return function (minLevel) {
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
      _assert(minLevel, _t.Number, 'minLevel');

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