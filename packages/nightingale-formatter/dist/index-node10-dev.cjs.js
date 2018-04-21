'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Level = _interopDefault(require('nightingale-levels'));
require('nightingale-types');

const levelToStyles = {
  [Level.TRACE]: ['gray'],
  [Level.DEBUG]: ['gray'],
  // [Levels.INFO]: ['gray'],
  [Level.WARN]: ['yellow'],
  [Level.ERROR]: ['red', 'bold'],
  [Level.CRITICAL]: ['red', 'bold'],
  [Level.FATAL]: ['bgRed', 'white'],
  [Level.EMERGENCY]: ['bgRed', 'white']
};

const levelToSymbol = {
  [Level.TRACE]: '•',
  [Level.DEBUG]: '•',
  [Level.INFO]: '→',
  [Level.WARN]: '⚠',
  [Level.ERROR]: '✖',
  [Level.CRITICAL]: '!',
  [Level.FATAL]: '‼',
  [Level.EMERGENCY]: '‼'
};

const styleToHexColor = {
  orange: 'ff5f00',
  grayLight: '808080',
  'gray-light': '808080'
};

/* eslint-disable no-restricted-globals */
const styleToHtmlStyle = {
  // text style
  bold: {
    open: 'font-weight: bold',
    close: 'font-weight: normal'
  },
  italic: {
    open: 'font-style: italic',
    close: 'font-style: normal'
  },
  underline: {
    open: 'text-decoration: underline',
    close: 'text-decoration: none'
  },
  inverse: {
    open: 'unicode-bidi: bidi-override; direction: rtl',
    close: 'unicode-bidi: normal; direction: ltr'
  },
  strikethrough: {
    open: 'text-decoration: line-through',
    close: 'text-decoration: none'
  },
  black: {
    open: 'color: black',
    close: 'color: initial'
  },
  red: {
    open: 'color: #ff0020',
    close: 'color: initial'
  },
  green: {
    open: 'color: #00b317',
    close: 'color: initial'
  },
  yellow: {
    open: 'color: #ffcc00',
    close: 'color: initial'
  },
  blue: {
    open: 'color: #00a0ff',
    close: 'color: initial'
  },
  magenta: {
    open: 'color: #ff00a0',
    close: 'color: initial'
  },
  cyan: {
    open: 'color: #00cfd8',
    close: 'color: initial'
  },
  white: {
    open: 'color: white',
    close: 'color: initial'
  },
  gray: {
    open: 'color: gray',
    close: 'color: initial'
  },
  bgBlack: {
    open: 'background: black',
    close: 'background: initial'
  },
  bgRed: {
    open: 'background: #ff0020',
    close: 'background: initial'
  },
  bgGreen: {
    open: 'background: #00b317',
    close: 'background: initial'
  },
  bgYellow: {
    open: 'background: #ffcc00',
    close: 'background: initial'
  },
  bgBlue: {
    open: 'background: #00a0ff',
    close: 'background: initial'
  },
  bgMagenta: {
    open: 'background: #ff00a0',
    close: 'background: initial'
  },
  bgCyan: {
    open: 'background: #00cfd8',
    close: 'background: initial'
  },
  bgWhite: {
    open: 'background: white',
    close: 'background: initial'
  },
  orange: {
    open: `color: #${styleToHexColor.orange}`,
    close: 'color: initial'
  },
  grayLight: {
    open: `color: #${styleToHexColor.grayLight}`,
    close: 'color: initial'
  },
  'gray-light': {
    open: `color: #${styleToHexColor.grayLight}`,
    close: 'color: initial'
  }
};

/* eslint-disable max-lines, no-useless-concat, prefer-template, no-use-before-define, typescript/no-use-before-define */

const noStyleFn = (styles, value) => value;

function tryStringify(arg) {
  try {
    return JSON.stringify(arg).replace(/\\n/g, '\n');
  } catch (_) {
    return '[Circular]';
  }
}

const sameRawFormattedValue = value => ({
  stringValue: value,
  formattedValue: value
});

function internalFormatValue(value, styleFn, styles, {
  padding,
  depth,
  maxDepth,
  objects
}) {
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
        objects
      });
    }
  } else if (Array.isArray(value)) {
    if (depth >= maxDepth) {
      stringValue = '[Array...]';
    } else {
      return internalFormatArray(value, styleFn, {
        padding,
        depth: depth + 1,
        maxDepth,
        objects
      });
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
        objects
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
        objects
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
    formattedValue
  };
}

const internalFormatKey = (key, styleFn) => {
  if (!key) return {
    stringKey: '',
    formattedKey: ''
  };
  return {
    stringKey: `${key}: `,
    formattedKey: styleFn(['gray-light', 'bold'], `${key}:`) + ' '
  };
};

const internalFormatMapKey = (key, styleFn, internalFormatParams) => {
  const {
    stringValue,
    formattedValue
  } = internalFormatValue(key, noStyleFn, undefined, internalFormatParams);
  return {
    stringKey: stringValue + ' => ',
    formattedKey: styleFn(['gray-light', 'bold'], `${formattedValue}:`) + ' '
  };
};

const internalFormatIterator = (values, styleFn, objectStyles, {
  padding,
  depth,
  maxDepth,
  objects
}, {
  prefix,
  suffix,
  prefixSuffixSpace = ' ',
  formatKey = internalFormatKey
}) => {
  let breakLine = false;

  const formattedSeparator = () => styleFn(['gray'], ",");

  const valuesMaxIndex = values.length - 1;
  const formattedValues = values.map(({
    key,
    value
  }, index) => {
    const internalFormatParams = {
      padding,
      depth: depth + 1,
      maxDepth,
      objects
    }; // key must be formatted before value (browser-formatter needs order)

    const {
      stringKey,
      formattedKey
    } = formatKey(key, styleFn, internalFormatParams);
    let {
      stringValue,
      formattedValue
    } = internalFormatValue(value, styleFn, key && objectStyles && objectStyles[key], internalFormatParams);

    if (stringValue && (stringValue.length > 80 || stringValue.indexOf('\n') !== -1)) {
      breakLine = true;
      stringValue = stringValue.replace(/\n/g, `\n${padding}`);
      formattedValue = formattedValue.replace(/\n/g, `\n${padding}`);
    }

    return {
      stringValue: stringKey + stringValue + (index === valuesMaxIndex ? '' : ","),
      // eslint-disable-next-line no-useless-concat
      formattedValue: formattedKey + formattedValue + (index === valuesMaxIndex ? '' : formattedSeparator()) // note: we need to format the separator for each values for browser-formatter

    };
  });
  return {
    stringValue: prefix + formattedValues.map(breakLine ? v => `\n${padding}${v.stringValue}` : fv => fv.stringValue).join(breakLine ? '\n' : ' ') + suffix,
    // eslint-disable-next-line prefer-template
    formattedValue: `${prefix}${breakLine ? '' : prefixSuffixSpace}` + formattedValues.map(breakLine ? v => `\n${padding}${v.formattedValue}` : v => v.formattedValue).join(breakLine ? '' : ' ') + `${breakLine ? ',\n' : prefixSuffixSpace}${suffix}`
  };
};

function internalFormatObject(object, styleFn, objectStyles, {
  padding,
  depth,
  maxDepth,
  objects
}) {
  if (objects.has(object)) {
    return sameRawFormattedValue('{Circular Object}');
  }

  const keys = Object.keys(object);

  if (keys.length === 0) {
    return sameRawFormattedValue('{}');
  }

  objects.add(object);
  const result = internalFormatIterator(keys.map(key => ({
    key,
    value: object[key]
  })), styleFn, objectStyles, {
    padding,
    depth,
    maxDepth,
    objects
  }, {
    prefix: '{',
    suffix: '}'
  });
  objects.delete(object);
  return result;
}

function internalFormatMap(name, map, styleFn, {
  padding,
  depth,
  maxDepth,
  objects
}) {
  if (objects.has(map)) {
    return sameRawFormattedValue(`{Circular ${name}}`);
  }

  const keys = Array.from(map.keys());

  if (keys.length === 0) {
    return sameRawFormattedValue(`${name} {}`);
  }

  objects.add(map);
  const result = internalFormatIterator(keys.map(key => ({
    key,
    value: map.get(key)
  })), styleFn, undefined, {
    padding,
    depth,
    maxDepth,
    objects
  }, {
    prefix: `${name} {`,
    suffix: '}',
    formatKey: internalFormatMapKey
  });
  objects.delete(map);
  return result;
}

function internalFormatArray(array, styleFn, {
  padding,
  depth,
  maxDepth,
  objects
}) {
  if (objects.has(array)) {
    return sameRawFormattedValue('{Circular Array}');
  }

  if (array.length === 0) {
    return sameRawFormattedValue('[]');
  }

  objects.add(array);
  const result = internalFormatIterator(array.map(value => ({
    key: undefined,
    value
  })), styleFn, undefined, {
    padding,
    depth,
    maxDepth,
    objects
  }, {
    prefix: '[',
    suffix: ']',
    prefixSuffixSpace: ''
  });
  objects.delete(array);
  return result;
}

function internalFormatSet(name, set, styleFn, {
  padding,
  depth,
  maxDepth,
  objects
}) {
  if (objects.has(set)) {
    return sameRawFormattedValue(`{Circular ${name}}`);
  }

  const values = Array.from(set.values());

  if (values.length === 0) {
    return sameRawFormattedValue(`${name} []`);
  }

  objects.add(set);
  const result = internalFormatIterator(values.map(value => ({
    key: undefined,
    value
  })), styleFn, undefined, {
    padding,
    depth,
    maxDepth,
    objects
  }, {
    prefix: `${name} [`,
    suffix: ']'
  });
  objects.delete(set);
  return result;
}

function formatObject(object, styleFn = noStyleFn, objectStyles, {
  padding = '  ',
  maxDepth = 10
} = {}) {
  const {
    formattedValue: result
  } = internalFormatObject(object, styleFn, objectStyles, {
    padding,
    maxDepth,
    depth: 0,
    objects: new Set()
  });

  if (result === '{}') {
    return '';
  }

  return result;
}

function formatRecordToString(record, style) {
  const parts = [];

  if (record.displayName) {
    parts.push(style(['gray-light'], record.displayName));
  } else if (record.key) {
    parts.push(style(['gray-light'], record.key));
  }

  if (record.datetime) {
    parts.push(style(['gray', 'bold'], record.datetime.toTimeString().split(' ')[0]));
    /* new Date().toFormat('HH24:MI:SS') */
  }

  let message = record.symbol || levelToSymbol[record.level];
  const styles = record.styles || levelToStyles[record.level];

  if (record.message) {
    if (message) {
      message += ` ${record.message}`;
    } else {
      message = record.message;
    }
  }

  if (message) {
    if (styles) {
      message = style(styles, message);
    }

    parts.push(message);
  }

  const formatRecordObject = (key, object, styles) => {
    if (!object) {
      return;
    }

    const stringObject = formatObject(object, style, styles);

    if (!stringObject) {
      return;
    }

    parts.push(stringObject);
  };

  formatRecordObject('metadata', record.metadata, record.metadataStyles);
  formatRecordObject('extra', record.extra, undefined);
  formatRecordObject('context', record.context, undefined);
  return parts.join(' ');
}

exports.levelToStyles = levelToStyles;
exports.levelToSymbol = levelToSymbol;
exports.styleToHtmlStyle = styleToHtmlStyle;
exports.styleToHexColor = styleToHexColor;
exports.formatObject = formatObject;
exports.formatRecordToString = formatRecordToString;
//# sourceMappingURL=index-node10-dev.cjs.js.map
