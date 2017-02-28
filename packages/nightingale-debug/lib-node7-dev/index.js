'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFindDebugLevel;

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const specialRegexpChars = /[\\^$+?.()|[\]{}]/;

const DebugValueType = _flowRuntime2.default.type('DebugValueType', _flowRuntime2.default.union(_flowRuntime2.default.string(), _flowRuntime2.default.ref('RegExp'), _flowRuntime2.default.array(_flowRuntime2.default.union(_flowRuntime2.default.string(), _flowRuntime2.default.ref('RegExp')))));

const createTestFunctionFromRegexpString = value => {
  if (!value.endsWith('/')) throw new Error('Invalid RegExp DEBUG value');
  const regexp = new RegExp(value.slice(1, -1));
  return string => regexp.test(string);
};

const createTestFunctionFromValue = value => {
  if (value.endsWith(':*')) {
    value = value.slice(0, -2);
    return string => string.startsWith(value);
  }

  return string => string === value;
};

function createFindDebugLevel(debugValue) {
  let _debugValueType = _flowRuntime2.default.nullable(DebugValueType);

  _flowRuntime2.default.param('debugValue', _debugValueType).assert(debugValue);

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
    debugValue.forEach(value => {
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
      return () => _nightingaleLevels2.default.ALL;
    } else {
      return (minLevel, key) => skips.some(skip => skip(key)) ? minLevel : _nightingaleLevels2.default.ALL;
    }
  }

  if (debugValues.length === 0) {
    return minLevel => {
      let _minLevelType = _flowRuntime2.default.number();

      _flowRuntime2.default.param('minLevel', _minLevelType).assert(minLevel);

      return minLevel;
    };
  }

  return (minLevel, key) => {
    if (minLevel === _nightingaleLevels2.default.ALL || !key) {
      return minLevel;
    }

    if (debugValues.some(debugValue => debugValue(key))) {
      return skips.some(skip => skip(key)) ? minLevel : _nightingaleLevels2.default.ALL;
    }

    return minLevel;
  };
}
//# sourceMappingURL=index.js.map