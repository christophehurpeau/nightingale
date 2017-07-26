/* eslint-disable no-use-before-define, max-lines */

function tryStringify(arg) {
  try {
    return JSON.stringify(arg);
  } catch (_) {
    return '[Circular]';
  }
}

function internalFormatValue(value, styleFn, styles, { padding, depth, maxDepth, objects }) {
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
        case 'date':
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
      stringValue = '{object...}';
    } else {
      return internalFormatObject(value, styleFn, undefined, { padding, depth: depth + 1, maxDepth, objects });
    }
  } else if (Array.isArray(value)) {
    if (depth >= maxDepth) {
      stringValue = '[array...]';
    } else {
      return internalFormatArray(value, styleFn, { padding, depth: depth + 1, maxDepth, objects });
    }
  } else if (value instanceof Error) {
    stringValue = value.toString();
  } else {
    stringValue = tryStringify(value);
  }

  const formattedValue = styleFn(styles, stringValue);

  return {
    stringValue,
    formattedValue
  };
}

const separator = ',';

const internalFormatIterator = (values, styleFn, objectStyles, { padding, depth, maxDepth, objects }, { prefix, suffix, prefixSuffixSpace = ' ' }) => {
  let breakLine = false;
  const formattedSeparator = () => styleFn(['gray'], separator);

  const valuesMaxIndex = values.length - 1;
  values = values.map(({ key, value }, index) => {

    // key must be formatted before value (browser-formatter needs order)
    const formattedKey = key ? `${styleFn(['gray-light', 'bold'], `${key}:`)} ` : '';

    let { stringValue, formattedValue } = internalFormatValue(value, styleFn, key && objectStyles && objectStyles[key], { padding, depth: depth + 1, maxDepth, objects });

    if (stringValue && (stringValue.length > 80 || stringValue.indexOf('\n') !== -1)) {
      breakLine = true;
      stringValue = stringValue.replace(/\n/g, `\n${padding}`);
      formattedValue = formattedValue.replace(/\n/g, `\n${padding}`);
    }

    return {
      stringValue: stringValue + (index === valuesMaxIndex ? '' : separator),
      // eslint-disable-next-line no-useless-concat
      formattedValue: formattedKey + formattedValue + (index === valuesMaxIndex ? '' : formattedSeparator())
    };
  });

  return {
    stringValue: prefix + values.map(breakLine ? v => `\n${padding}${v.stringValue}` : fv => fv.stringValue).join(breakLine ? '\n' : ' ') + suffix,
    // eslint-disable-next-line prefer-template
    formattedValue: `${prefix}${breakLine ? '' : prefixSuffixSpace}` + values.map(breakLine ? v => `\n${padding}${v.formattedValue}` : v => v.formattedValue).join(breakLine ? '' : ' ') + `${breakLine ? ',\n' : prefixSuffixSpace}${suffix}`
  };
};

function internalFormatObject(object, styleFn, objectStyles, { padding, depth, maxDepth, objects }) {
  if (objects.has(object)) {
    return { stringValue: '{Circular object}', formattedValue: '{Circular object}' };
  }

  const keys = Object.keys(object);
  if (keys.length === 0) {
    return {
      stringValue: '{}',
      formattedValue: '{}'
    };
  }

  objects.add(object);

  const result = internalFormatIterator(keys.map(key => ({ key, value: object[key] })), styleFn, objectStyles, { padding, depth, maxDepth, objects }, { prefix: '{', suffix: '}' });

  objects.delete(object);

  return result;
}

function internalFormatArray(array, styleFn, { padding, depth, maxDepth, objects }) {
  if (objects.has(array)) {
    return { stringValue: '{Circular array}', formattedValue: '{Circular array}' };
  }

  if (array.length === 0) {
    return {
      stringValue: '[]',
      formattedValue: '[]'
    };
  }

  objects.add(array);

  const result = internalFormatIterator(array.map(value => ({ key: undefined, value })), styleFn, undefined, { padding, depth, maxDepth, objects }, { prefix: '[', suffix: ']', prefixSuffixSpace: '' });

  objects.delete(array);

  return result;
}

export default function formatObject(object, styleFn, objectStyles, {
  padding = '  ',
  maxDepth = 10
} = {}) {
  const { formattedValue: result } = internalFormatObject(object, styleFn, objectStyles, { padding, maxDepth, depth: 0, objects: new Set() });

  if (result === '{}') {
    return '';
  }

  return result;
}
//# sourceMappingURL=formatObject.js.map