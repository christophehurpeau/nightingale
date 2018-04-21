/* eslint-disable max-lines, no-useless-concat, prefer-template, no-use-before-define, typescript/no-use-before-define */
import { Styles } from 'nightingale-types';

export { Styles };

export interface FormatObjectOptions {
  padding?: string;
  maxDepth?: number;
}

export type StyleFn = (styles: Styles, value: string) => string;
export type ObjectStyles = { [key: string]: Styles };

const noStyleFn: StyleFn = (styles: Styles, value: string): string => value;

interface InternalFormatParams {
  padding: string;
  depth: number;
  maxDepth: number;
  objects: Set<any>;
}

interface FormattedKey {
  stringKey: string;
  formattedKey: string;
}

type FormatKey = (
  key: string,
  styleFn: StyleFn,
  internalFormatParams: InternalFormatParams,
) => FormattedKey;

interface Value {
  key: any;
  value: any;
}

interface FormattedValue {
  stringValue: string;
  formattedValue: string;
}

type Values = Array<Value>;

interface InternalFormatIteratorParams {
  prefix: string;
  suffix: string;
  prefixSuffixSpace?: string;
  formatKey?: FormatKey;
}

function tryStringify(arg: any) {
  try {
    return JSON.stringify(arg).replace(/\\n/g, '\n');
  } catch (_) {
    return '[Circular]';
  }
}

const sameRawFormattedValue = (value: string) => ({ stringValue: value, formattedValue: value });

function internalFormatValue(
  value: any,
  styleFn: StyleFn,
  styles: Styles,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
) {
  const typeofValue = typeof value;

  if (!styles) {
    if (value == null) {
      styles = ['cyan'];
    } else {
      switch (typeofValue) {
        case 'boolean':
          styles = ['green'];
          break;
        case 'number':
          styles = ['yellow'];
          break;
        case 'string':
          styles = ['orange'];
          break;
        case 'symbol':
          styles = ['magenta'];
          break;
      }
    }
  }

  let stringValue;
  if (value === null) {
    stringValue = 'null';
  } else if (value === undefined) {
    stringValue = 'undefined';
  } else if (typeofValue === 'boolean') {
    stringValue = value.toString();
  } else if (value.constructor === Object) {
    if (depth >= maxDepth) {
      stringValue = '{Object...}';
    } else {
      return internalFormatObject(value, styleFn, undefined, {
        padding,
        depth: depth + 1,
        maxDepth,
        objects,
      });
    }
  } else if (Array.isArray(value)) {
    if (depth >= maxDepth) {
      stringValue = '[Array...]';
    } else {
      return internalFormatArray(value, styleFn, { padding, depth: depth + 1, maxDepth, objects });
    }
  } else if (value instanceof Error) {
    const stack = value.stack;
    stringValue = stack && stack.startsWith(value.message) ? stack : `${value.message}\n${stack}`;
  } else if (value instanceof Map) {
    const name = value.constructor.name;
    if (depth >= maxDepth) {
      stringValue = `{${name}...}`;
    } else {
      return internalFormatMap(name, value, styleFn, {
        padding,
        depth: depth + 1,
        maxDepth,
        objects,
      });
    }
  } else if (value instanceof Set) {
    const name = value.constructor.name;
    if (depth >= maxDepth) {
      stringValue = `{${name}...}`;
    } else {
      return internalFormatSet(name, value, styleFn, {
        padding,
        depth: depth + 1,
        maxDepth,
        objects,
      });
    }
  } else if (value instanceof WeakMap) {
    stringValue = '{WeakMap...}';
  } else if (value instanceof WeakSet) {
    stringValue = '{WeakSet...}';
  } else {
    stringValue = tryStringify(value);
  }

  const formattedValue = styleFn(styles, stringValue);

  return {
    stringValue,
    formattedValue,
  };
}

const separator = ',';

const internalFormatKey: FormatKey = (
  key: string,
  styleFn: StyleFn,
  internalFormatParams: InternalFormatParams,
): FormattedKey => {
  if (!key) return { stringKey: '', formattedKey: '' };
  return {
    stringKey: `${key}: `,
    formattedKey: styleFn(['gray-light', 'bold'], `${key}:`) + ' ',
  };
};

const internalFormatMapKey: FormatKey = (
  key: string,
  styleFn: StyleFn,
  internalFormatParams: InternalFormatParams,
): FormattedKey => {
  const { stringValue, formattedValue } = internalFormatValue(
    key,
    noStyleFn,
    undefined,
    internalFormatParams,
  );
  return {
    stringKey: stringValue + ' => ',
    formattedKey: styleFn(['gray-light', 'bold'], `${formattedValue}:`) + ' ',
  };
};

const internalFormatIterator = (
  values: Values,
  styleFn: StyleFn,
  objectStyles: ObjectStyles | undefined,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
  {
    prefix,
    suffix,
    prefixSuffixSpace = ' ',
    formatKey = internalFormatKey,
  }: InternalFormatIteratorParams,
) => {
  let breakLine = false;
  const formattedSeparator = () => styleFn(['gray'], separator);

  const valuesMaxIndex = values.length - 1;
  const formattedValues: Array<FormattedValue> = values.map(
    ({ key, value }: { key: any; value: any }, index: number) => {
      const nextDepth = depth + 1;
      const internalFormatParams = { padding, depth: nextDepth, maxDepth, objects };

      // key must be formatted before value (browser-formatter needs order)
      const { stringKey, formattedKey } = formatKey(key, styleFn, internalFormatParams);

      let { stringValue, formattedValue } = internalFormatValue(
        value,
        styleFn,
        key && objectStyles && objectStyles[key],
        internalFormatParams,
      );

      if (stringValue && (stringValue.length > 80 || stringValue.indexOf('\n') !== -1)) {
        breakLine = true;
        stringValue = stringValue.replace(/\n/g, `\n${padding}`);
        formattedValue = formattedValue.replace(/\n/g, `\n${padding}`);
      }

      return {
        stringValue: stringKey + stringValue + (index === valuesMaxIndex ? '' : separator),
        // eslint-disable-next-line no-useless-concat
        formattedValue:
          formattedKey + formattedValue + (index === valuesMaxIndex ? '' : formattedSeparator()),
        // note: we need to format the separator for each values for browser-formatter
      };
    },
  );

  return {
    stringValue:
      prefix +
      formattedValues
        .map(breakLine ? v => `\n${padding}${v.stringValue}` : fv => fv.stringValue)
        .join(breakLine ? '\n' : ' ') +
      suffix,
    // eslint-disable-next-line prefer-template
    formattedValue:
      `${prefix}${breakLine ? '' : prefixSuffixSpace}` +
      formattedValues
        .map(breakLine ? v => `\n${padding}${v.formattedValue}` : v => v.formattedValue)
        .join(breakLine ? '' : ' ') +
      `${breakLine ? ',\n' : prefixSuffixSpace}${suffix}`,
  };
};

function internalFormatObject(
  object: { [key: string]: any },
  styleFn: StyleFn,
  objectStyles: ObjectStyles | undefined,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
) {
  if (objects.has(object)) {
    return sameRawFormattedValue('{Circular Object}');
  }

  const keys: Array<string> = Object.keys(object);
  if (keys.length === 0) {
    return sameRawFormattedValue('{}');
  }

  objects.add(object);

  const result = internalFormatIterator(
    keys.map(key => ({ key, value: object[key] })),
    styleFn,
    objectStyles,
    { padding, depth, maxDepth, objects },
    { prefix: '{', suffix: '}' },
  );

  objects.delete(object);

  return result;
}

function internalFormatMap(
  name: string,
  map: Map<any, any>,
  styleFn: StyleFn,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
) {
  if (objects.has(map)) {
    return sameRawFormattedValue(`{Circular ${name}}`);
  }

  const keys = Array.from(map.keys());
  if (keys.length === 0) {
    return sameRawFormattedValue(`${name} {}`);
  }

  objects.add(map);

  const result = internalFormatIterator(
    keys.map(key => ({ key, value: map.get(key) })),
    styleFn,
    undefined,
    { padding, depth, maxDepth, objects },
    { prefix: `${name} {`, suffix: '}', formatKey: internalFormatMapKey },
  );

  objects.delete(map);

  return result;
}

function internalFormatArray(
  array: Array<any>,
  styleFn: StyleFn,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
) {
  if (objects.has(array)) {
    return sameRawFormattedValue('{Circular Array}');
  }

  if (array.length === 0) {
    return sameRawFormattedValue('[]');
  }

  objects.add(array);

  const result = internalFormatIterator(
    array.map((value: any) => ({ key: undefined, value })),
    styleFn,
    undefined,
    { padding, depth, maxDepth, objects },
    { prefix: '[', suffix: ']', prefixSuffixSpace: '' },
  );

  objects.delete(array);

  return result;
}

function internalFormatSet(
  name: string,
  set: Set<any>,
  styleFn: StyleFn,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
) {
  if (objects.has(set)) {
    return sameRawFormattedValue(`{Circular ${name}}`);
  }

  const values = Array.from(set.values());
  if (values.length === 0) {
    return sameRawFormattedValue(`${name} []`);
  }

  objects.add(set);

  const result = internalFormatIterator(
    values.map(value => ({ key: undefined, value })),
    styleFn,
    undefined,
    { padding, depth, maxDepth, objects },
    { prefix: `${name} [`, suffix: ']' },
  );

  objects.delete(set);

  return result;
}

export default function formatObject(
  object: { [key: string]: any },
  styleFn: StyleFn = noStyleFn,
  objectStyles?: ObjectStyles,
  { padding = '  ', maxDepth = 10 }: FormatObjectOptions = {},
) {
  const { formattedValue: result } = internalFormatObject(object, styleFn, objectStyles, {
    padding,
    maxDepth,
    depth: 0,
    objects: new Set(),
  });

  if (result === '{}') {
    return '';
  }

  return result;
}
