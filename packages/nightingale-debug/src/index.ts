/* eslint-disable complexity */
import { Level } from "nightingale-levels";

const specialRegexpChars = /[$()+.?[\\\]^{|}]/;

type TestFunction = (string: string) => boolean;
export type DebugValueType = RegExp | string[] | string;

const createTestFunctionFromRegexp =
  (regexp: RegExp): TestFunction =>
  (string: string) =>
    regexp.test(string);

const createTestFunctionFromRegexpString = (value: string): TestFunction => {
  if (!value.endsWith("/")) throw new Error("Invalid RegExp DEBUG value");
  return createTestFunctionFromRegexp(new RegExp(value.slice(1, -1)));
};

const createTestFunctionFromValue = (value: string): TestFunction => {
  if (value.endsWith(":*")) {
    value = value.slice(0, -2);
    return (string: string) => string.startsWith(value);
  }

  return (string: string) => string === value;
};

export type FindDebugLevel = (minLevel: Level, key: string) => Level;

export function createFindDebugLevel(
  debugValue?: DebugValueType
): FindDebugLevel {
  let isWildcard = false;
  const debugValues: TestFunction[] = [];
  const skips: TestFunction[] = [];

  if (!Array.isArray(debugValue)) {
    if (debugValue instanceof RegExp) {
      debugValues.push(createTestFunctionFromRegexp(debugValue));
      debugValue = undefined;
    } else if (debugValue) {
      debugValue = debugValue.trim();

      if (debugValue.startsWith("/")) {
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
          `Invalid debug value: "${value}" (contains special chars)`
        );
      }

      if (!value) return;

      if (value === "*") {
        isWildcard = true;
        return;
      }

      if (value.startsWith("-")) {
        skips.push(createTestFunctionFromValue(value.slice(1)));
      } else if (!isWildcard) {
        debugValues.push(createTestFunctionFromValue(value));
      }
    });
  }

  if (isWildcard) {
    if (skips.length === 0) {
      return () => Level.ALL;
    } else {
      return (minLevel: Level, key: string) =>
        skips.some((skip) => skip(key)) ? minLevel : Level.ALL;
    }
  }

  if (debugValues.length === 0) {
    return (minLevel: Level) => minLevel;
  }

  return (minLevel: Level, key: string) => {
    if (minLevel === Level.ALL || !key) {
      return minLevel;
    }

    if (debugValues.some((dv) => dv(key))) {
      return skips.some((skip) => skip(key)) ? minLevel : Level.ALL;
    }

    return minLevel;
  };
}
