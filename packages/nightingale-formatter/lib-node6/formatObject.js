'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatObject;
/* eslint-disable no-use-before-define */

function tryStringify(arg) {
  try {
    return JSON.stringify(arg);
  } catch (_) {
    return '[Circular]';
  }
}

function internalFormatValue(value, styleFn, styles, _ref) {
  let padding = _ref.padding;
  let depth = _ref.depth;
  let maxDepth = _ref.maxDepth;
  let objects = _ref.objects;

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
    stringValue = value.stack || value.message || '';
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

const internalFormatIterator = (values, styleFn, objectStyles, _ref2, _ref3) => {
  let padding = _ref2.padding;
  let depth = _ref2.depth;
  let maxDepth = _ref2.maxDepth;
  let objects = _ref2.objects;
  let prefix = _ref3.prefix;
  let suffix = _ref3.suffix;
  var _ref3$prefixSuffixSpa = _ref3.prefixSuffixSpace;
  let prefixSuffixSpace = _ref3$prefixSuffixSpa === undefined ? ' ' : _ref3$prefixSuffixSpa;

  let breakLine = false;
  const formattedSeparator = () => styleFn(['gray'], separator);

  const valuesMaxIndex = values.length - 1;
  values = values.map((_ref4, index) => {
    let key = _ref4.key;
    let value = _ref4.value;


    // key must be formatted before value (browser-formatter needs order)
    const formattedKey = key ? `${ styleFn(['gray-light', 'bold'], `${ key }:`) } ` : '';

    var _internalFormatValue = internalFormatValue(value, styleFn, key && objectStyles && objectStyles[key], { padding, depth: depth + 1, maxDepth, objects });

    let stringValue = _internalFormatValue.stringValue;
    let formattedValue = _internalFormatValue.formattedValue;


    if (stringValue && (stringValue.length > 80 || stringValue.indexOf('\n') !== -1)) {
      breakLine = true;
      stringValue = stringValue.replace(/\n/g, `\n${ padding }`);
      formattedValue = formattedValue.replace(/\n/g, `\n${ padding }`);
    }

    return {
      stringValue: stringValue + (index === valuesMaxIndex ? '' : separator),
      // eslint-disable-next-line no-useless-concat
      formattedValue: formattedKey + formattedValue + (index === valuesMaxIndex ? '' : formattedSeparator())
    };
  });

  return {
    stringValue: prefix + values.map(breakLine ? v => `\n${ padding }${ v.stringValue }` : fv => fv.stringValue).join(breakLine ? '\n' : ' ') + suffix,
    // eslint-disable-next-line prefer-template
    formattedValue: `${ prefix }${ breakLine ? '' : prefixSuffixSpace }` + values.map(breakLine ? v => `\n${ padding }${ v.formattedValue }` : v => v.formattedValue).join(breakLine ? '' : ' ') + `${ breakLine ? `,\n` : prefixSuffixSpace }${ suffix }`
  };
};

function internalFormatObject(object, styleFn, objectStyles, _ref5) {
  let padding = _ref5.padding;
  let depth = _ref5.depth;
  let maxDepth = _ref5.maxDepth;
  let objects = _ref5.objects;

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

function internalFormatArray(array, styleFn, _ref6) {
  let padding = _ref6.padding;
  let depth = _ref6.depth;
  let maxDepth = _ref6.maxDepth;
  let objects = _ref6.objects;

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

function formatObject(object, styleFn, objectStyles) {
  var _ref7 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var _ref7$padding = _ref7.padding;
  let padding = _ref7$padding === undefined ? '  ' : _ref7$padding;
  var _ref7$maxDepth = _ref7.maxDepth;
  let maxDepth = _ref7$maxDepth === undefined ? 10 : _ref7$maxDepth;

  var _internalFormatObject = internalFormatObject(object, styleFn, objectStyles, { padding, maxDepth, depth: 0, objects: new Set() });

  const result = _internalFormatObject.formattedValue;


  if (result === '{}') {
    return '';
  }

  return result;
}
//# sourceMappingURL=formatObject.js.map