import levels from 'nightingale-levels';

const specialRegexpChars = /[\\^$+?.()|[\]{}]/;

type DebugValueType = string | RegExp | Array<string | RegExp>;

const createTestFunctionFromRegexpString = (value) => {
  if (!value.endsWith('/')) throw new Error('Invalid RegExp DEBUG value');
  const regexp = new RegExp(value.slice(1, -1));
  return string => regexp.test(string);
};

const createTestFunctionFromValue = (value) => {
  if (value.endsWith(':*')) {
    value = value.slice(0, -2);
    return string => string.startsWith(value);
  }

  return string => string === value;
};

export default function createFindDebugLevel(debugValue: ?DebugValueType) {
  debugValue = (debugValue || '');

  let wilcard = false;
  const debugValues = [];
  const skips = [];

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
      return (minLevel) => levels.ALL;
    } else {
      return (minLevel, key) => (
        skips.some(skip => skip(key)) ? minLevel : levels.ALL
      );
    }
  }

  if (debugValues.length === 0) {
    return (minLevel: number) => minLevel;
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
