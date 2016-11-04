/* eslint-disable no-use-before-define */

function tryStringify(arg) {
  try {
    return JSON.stringify(arg);
  } catch (_) {
    return '[Circular]';
  }
}

function internalFormatValue(value, styleFn, styles, _ref) {
  var padding = _ref.padding;
  var depth = _ref.depth;
  var maxDepth = _ref.maxDepth;
  var objects = _ref.objects;

  var typeofValue = typeof value;

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

  var stringValue = void 0;
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

  var formattedValue = styleFn(styles, stringValue);

  return {
    stringValue,
    formattedValue
  };
}

var separator = ',';

var internalFormatIterator = (values, styleFn, objectStyles, _ref2, _ref3) => {
  var padding = _ref2.padding;
  var depth = _ref2.depth;
  var maxDepth = _ref2.maxDepth;
  var objects = _ref2.objects;
  var prefix = _ref3.prefix;
  var suffix = _ref3.suffix;
  var _ref3$prefixSuffixSpa = _ref3.prefixSuffixSpace;
  var prefixSuffixSpace = _ref3$prefixSuffixSpa === undefined ? ' ' : _ref3$prefixSuffixSpa;

  var breakLine = false;
  var formattedSeparator = () => styleFn(['gray'], separator);

  var valuesMaxIndex = values.length - 1;
  values = values.map((_ref4, index) => {
    var key = _ref4.key;
    var value = _ref4.value;


    // key must be formatted before value (browser-formatter needs order)
    var formattedKey = key ? `${ styleFn(['gray-light', 'bold'], `${ key }:`) } ` : '';

    var _internalFormatValue = internalFormatValue(value, styleFn, key && objectStyles && objectStyles[key], { padding, depth: depth + 1, maxDepth, objects });

    var stringValue = _internalFormatValue.stringValue;
    var formattedValue = _internalFormatValue.formattedValue;


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
  var padding = _ref5.padding;
  var depth = _ref5.depth;
  var maxDepth = _ref5.maxDepth;
  var objects = _ref5.objects;

  if (objects.has(object)) {
    return { stringValue: '{Circular object}', formattedValue: '{Circular object}' };
  }

  var keys = Object.keys(object);
  if (keys.length === 0) {
    return {
      stringValue: '{}',
      formattedValue: '{}'
    };
  }

  objects.add(object);

  var result = internalFormatIterator(keys.map(key => ({ key, value: object[key] })), styleFn, objectStyles, { padding, depth, maxDepth, objects }, { prefix: '{', suffix: '}' });

  objects.delete(object);

  return result;
}

function internalFormatArray(array, styleFn, _ref6) {
  var padding = _ref6.padding;
  var depth = _ref6.depth;
  var maxDepth = _ref6.maxDepth;
  var objects = _ref6.objects;

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

  var result = internalFormatIterator(array.map(value => ({ key: undefined, value })), styleFn, undefined, { padding, depth, maxDepth, objects }, { prefix: '[', suffix: ']', prefixSuffixSpace: '' });

  objects.delete(array);

  return result;
}

export default function formatObject(object, styleFn, objectStyles) {
  var _ref7 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var _ref7$padding = _ref7.padding;
  var padding = _ref7$padding === undefined ? '  ' : _ref7$padding;
  var _ref7$maxDepth = _ref7.maxDepth;
  var maxDepth = _ref7$maxDepth === undefined ? 10 : _ref7$maxDepth;

  var _internalFormatObject = internalFormatObject(object, styleFn, objectStyles, { padding, maxDepth, depth: 0, objects: new Set() });

  var result = _internalFormatObject.formattedValue;


  if (result === '{}') {
    return '';
  }

  return result;
}
//# sourceMappingURL=formatObject.js.map