/* eslint-disable complexity */
import Level from 'nightingale-levels';

const specialRegexpChars = /[$()+.?[\\\]^{|}]/;

type TestFunction = (string: string) => boolean;
export type DebugValueType = string | RegExp | string[];

const createTestFunctionFromRegexp = (regexp: RegExp): TestFunction => (
  string: string,
) => regexp.test(string);

const createTestFunctionFromRegexpString = (value: string): TestFunction => {
  if (!value.endsWith('/')) throw new Error('Invalid RegExp DEBUG value');
  return createTestFunctionFromRegexp(new RegExp(value.slice(1, -1)));
};

const createTestFunctionFromValue = (value: string): TestFunction => {
  if (value.endsWith(':*')) {
    value = value.slice(0, -2);
    return (string: string) => string.startsWith(value);
  }

  return (string: string) => string === value;
};

export type FindDebugLevel = (minLevel: Level, key: string) => Level;

export default function createFindDebugLevel(
  debugValue?: DebugValueType,
): FindDebugLevel {
  let wilcard = false;
  const debugValues: TestFunction[] = [];
  const skips: TestFunction[] = [];

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
    (debugValue as string[]).forEach((value) => {
      if (specialRegexpChars.test(value)) {
        throw new Error(
          `Invalid debug value: "${value}" (contains special chars)`,
        );
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
      return () => Level.ALL;
    } else {
      return (minLevel: Level, key: string) =>
        skips.some((skip) => skip(key)) ? minLevel : Level.ALL;
    }
  }

  if (debugValues.length === 0) {
    return (minLevel: number) => minLevel;
  }

  return (minLevel: Level, key: string) => {
    if (minLevel === Level.ALL || !key) {
      return minLevel;
    }

    if (debugValues.some((debugValue) => debugValue(key))) {
      return skips.some((skip) => skip(key)) ? minLevel : Level.ALL;
    }

    return minLevel;
  };
}
