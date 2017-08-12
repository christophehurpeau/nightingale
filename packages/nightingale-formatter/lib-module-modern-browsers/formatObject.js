/* eslint-disable no-use-before-define, max-lines, no-useless-concat, prefer-template */

const noStyleFn = function noStyleFn(styles, value) {
  return value;
};

function tryStringify(arg) {
  try {
    return JSON.stringify(arg);
  } catch (_) {
    return '[Circular]';
  }
}

const sameRawFormattedValue = function sameRawFormattedValue(value) {
  return { stringValue: value, formattedValue: value };
};

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
      stringValue = '{Object...}';
    } else {
      return internalFormatObject(value, styleFn, undefined, { padding, depth: depth + 1, maxDepth, objects });
    }
  } else if (Array.isArray(value)) {
    if (depth >= maxDepth) {
      stringValue = '[Array...]';
    } else {
      return internalFormatArray(value, styleFn, { padding, depth: depth + 1, maxDepth, objects });
    }
  } else if (value instanceof Error) {
    const stack = value.stack;
    stringValue = stack.startsWith(value.message) ? stack : `${value.message}\n${stack}`;
  } else if (value instanceof Map || value instanceof WeakMap) {
    const name = value.constructor.name;
    if (depth >= maxDepth) {
      stringValue = `{${name}...}`;
    } else {
      return internalFormatMap(name, value, styleFn, { padding, depth: depth + 1, maxDepth, objects });
    }
  } else if (value instanceof Set || value instanceof WeakSet) {
    const name = value.constructor.name;
    if (depth >= maxDepth) {
      stringValue = `{${name}...}`;
    } else {
      return internalFormatSet(name, value, styleFn, { padding, depth: depth + 1, maxDepth, objects });
    }
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

const internalFormatKey = function internalFormatKey(key, styleFn) {
  if (!key) return { stringKey: '', formattedKey: '' };
  return {
    stringKey: `${key}: `,
    formattedKey: styleFn(['gray-light', 'bold'], `${key}:`) + ' '
  };
};

const internalFormatMapKey = function internalFormatMapKey(key, styleFn, internalFormatParams) {
  const { stringValue, formattedValue } = internalFormatValue(key, noStyleFn, undefined, internalFormatParams);
  return {
    stringKey: stringValue + ' => ',
    formattedKey: styleFn(['gray-light', 'bold'], `${formattedValue}:`) + ' '
  };
};

const internalFormatIterator = function internalFormatIterator(values, styleFn, objectStyles, { padding, depth, maxDepth, objects }, { prefix, suffix, prefixSuffixSpace = ' ', formatKey = internalFormatKey }) {
  let breakLine = false;
  const formattedSeparator = function formattedSeparator() {
    return styleFn(['gray'], separator);
  };

  const valuesMaxIndex = values.length - 1;
  values = values.map(function ({ key, value }, index) {
    const internalFormatParams = { padding, depth: depth + 1, maxDepth, objects };

    // key must be formatted before value (browser-formatter needs order)
    const { stringKey, formattedKey } = formatKey(key, styleFn, internalFormatParams);

    let { stringValue, formattedValue } = internalFormatValue(value, styleFn, key && objectStyles && objectStyles[key], internalFormatParams);

    if (stringValue && (stringValue.length > 80 || stringValue.indexOf('\n') !== -1)) {
      breakLine = true;
      stringValue = stringValue.replace(/\n/g, `\n${padding}`);
      formattedValue = formattedValue.replace(/\n/g, `\n${padding}`);
    }

    return {
      stringValue: stringKey + stringValue + (index === valuesMaxIndex ? '' : separator),
      // eslint-disable-next-line no-useless-concat
      formattedValue: formattedKey + formattedValue + (index === valuesMaxIndex ? '' : formattedSeparator())
    };
  });

  return {
    stringValue: prefix + values.map(breakLine ? function (v) {
      return `\n${padding}${v.stringValue}`;
    } : function (fv) {
      return fv.stringValue;
    }).join(breakLine ? '\n' : ' ') + suffix,
    // eslint-disable-next-line prefer-template
    formattedValue: `${prefix}${breakLine ? '' : prefixSuffixSpace}` + values.map(breakLine ? function (v) {
      return `\n${padding}${v.formattedValue}`;
    } : function (v) {
      return v.formattedValue;
    }).join(breakLine ? '' : ' ') + `${breakLine ? ',\n' : prefixSuffixSpace}${suffix}`
  };
};

function internalFormatObject(object, styleFn, objectStyles, { padding, depth, maxDepth, objects }) {
  if (objects.has(object)) {
    return sameRawFormattedValue('{Circular Object}');
  }

  const keys = Object.keys(object);
  if (keys.length === 0) {
    return sameRawFormattedValue('{}');
  }

  objects.add(object);

  const result = internalFormatIterator(keys.map(function (key) {
    return { key, value: object[key] };
  }), styleFn, objectStyles, { padding, depth, maxDepth, objects }, { prefix: '{', suffix: '}' });

  objects.delete(object);

  return result;
}

function internalFormatMap(name, map, styleFn, { padding, depth, maxDepth, objects }) {
  if (objects.has(map)) {
    return sameRawFormattedValue(`{Circular ${name}`);
  }

  const keys = Array.from(map.keys());
  if (keys.length === 0) {
    return sameRawFormattedValue(`${name} {}`);
  }

  objects.add(map);

  const result = internalFormatIterator(keys.map(function (key) {
    return { key, value: map.get(key) };
  }), styleFn, undefined, { padding, depth, maxDepth, objects }, { prefix: `${name} {`, suffix: '}', formatKey: internalFormatMapKey });

  objects.delete(map);

  return result;
}

function internalFormatArray(array, styleFn, { padding, depth, maxDepth, objects }) {
  if (objects.has(array)) {
    return sameRawFormattedValue('{Circular Array}');
  }

  if (array.length === 0) {
    return sameRawFormattedValue('[]');
  }

  objects.add(array);

  const result = internalFormatIterator(array.map(function (value) {
    return { key: undefined, value };
  }), styleFn, undefined, { padding, depth, maxDepth, objects }, { prefix: '[', suffix: ']', prefixSuffixSpace: '' });

  objects.delete(array);

  return result;
}

function internalFormatSet(name, set, styleFn, { padding, depth, maxDepth, objects }) {
  if (objects.has(set)) {
    return sameRawFormattedValue(`{Circular ${name}`);
  }

  const values = Array.from(set.values());
  if (values.length === 0) {
    return sameRawFormattedValue(`${name} []`);
  }

  objects.add(set);

  const result = internalFormatIterator(values.map(function (value) {
    return { key: undefined, value };
  }), styleFn, undefined, { padding, depth, maxDepth, objects }, { prefix: `${name} [`, suffix: ']' });

  objects.delete(set);

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