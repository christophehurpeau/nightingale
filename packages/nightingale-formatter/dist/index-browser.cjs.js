'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var levels = _interopDefault(require('nightingale-levels'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _levels$TRACE$levels$;

var levelToStyles = (_levels$TRACE$levels$ = {}, defineProperty(_levels$TRACE$levels$, levels.TRACE, ['gray']), defineProperty(_levels$TRACE$levels$, levels.DEBUG, ['gray']), defineProperty(_levels$TRACE$levels$, levels.WARN, ['yellow']), defineProperty(_levels$TRACE$levels$, levels.ERROR, ['red', 'bold']), defineProperty(_levels$TRACE$levels$, levels.CRITICAL, ['red', 'bold']), defineProperty(_levels$TRACE$levels$, levels.FATAL, ['bgRed', 'white']), defineProperty(_levels$TRACE$levels$, levels.EMERGENCY, ['bgRed', 'white']), _levels$TRACE$levels$);

var _levels$TRACE$levels$$1;

var levelToSymbol = (_levels$TRACE$levels$$1 = {}, defineProperty(_levels$TRACE$levels$$1, levels.TRACE, '•'), defineProperty(_levels$TRACE$levels$$1, levels.DEBUG, '•'), defineProperty(_levels$TRACE$levels$$1, levels.INFO, '→'), defineProperty(_levels$TRACE$levels$$1, levels.WARN, '⚠'), defineProperty(_levels$TRACE$levels$$1, levels.ERROR, '✖'), defineProperty(_levels$TRACE$levels$$1, levels.CRITICAL, '!'), defineProperty(_levels$TRACE$levels$$1, levels.FATAL, '‼'), defineProperty(_levels$TRACE$levels$$1, levels.EMERGENCY, '‼'), _levels$TRACE$levels$$1);

var hexColors = {
  orange: 'ff5f00',
  grayLight: '808080',
  'gray-light': '808080'
};

var styleToHtmlStyle = {
  get reset() {
    throw new Error();
  },

  // text style
  bold: { open: 'font-weight: bold', close: 'font-weight: normal' },
  italic: { open: 'font-style: italic', close: 'font-style: normal' },
  underline: { open: 'text-decoration: underline', close: 'text-decoration: none' },
  inverse: {
    open: 'unicode-bidi: bidi-override; direction: rtl',
    close: 'unicode-bidi: normal; direction: ltr'
  },
  strikethrough: { open: 'text-decoration: line-through', close: 'text-decoration: none' },

  black: { open: 'color: black', close: 'color: initial' },
  red: { open: 'color: #ff0020', close: 'color: initial' },
  green: { open: 'color: #00b317', close: 'color: initial' },
  yellow: { open: 'color: #ffcc00', close: 'color: initial' },
  blue: { open: 'color: #00a0ff', close: 'color: initial' },
  magenta: { open: 'color: #ff00a0', close: 'color: initial' },
  cyan: { open: 'color: #00cfd8', close: 'color: initial' },
  white: { open: 'color: white', close: 'color: initial' },
  gray: { open: 'color: gray', close: 'color: initial' },

  bgBlack: { open: 'background: black', close: 'background: initial' },
  bgRed: { open: 'background: #ff0020', close: 'background: initial' },
  bgGreen: { open: 'background: #00b317', close: 'background: initial' },
  bgYellow: { open: 'background: #ffcc00', close: 'background: initial' },
  bgBlue: { open: 'background: #00a0ff', close: 'background: initial' },
  bgMagenta: { open: 'background: #ff00a0', close: 'background: initial' },
  bgCyan: { open: 'background: #00cfd8', close: 'background: initial' },
  bgWhite: { open: 'background: white', close: 'background: initial' },

  orange: { open: 'color: #' + hexColors.orange, close: 'color: initial' },
  grayLight: { open: 'color: #' + hexColors.grayLight, close: 'color: initial' },
  'gray-light': { open: 'color: #' + hexColors.grayLight, close: 'color: initial' }
};

/* eslint-disable no-use-before-define, max-lines, no-useless-concat, prefer-template */

var noStyleFn = function noStyleFn(styles, value) {
  return value;
};

function tryStringify(arg) {
  try {
    return JSON.stringify(arg).replace(/\\n/g, '\n');
  } catch (_) {
    return '[Circular]';
  }
}

var sameRawFormattedValue = function sameRawFormattedValue(value) {
  return { stringValue: value, formattedValue: value };
};

function internalFormatValue(value, styleFn, styles, _ref) {
  var padding = _ref.padding,
      depth = _ref.depth,
      maxDepth = _ref.maxDepth,
      objects = _ref.objects;

  var typeofValue = typeof value === 'undefined' ? 'undefined' : _typeof(value);

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
      stringValue = '{Object...}';
    } else {
      return internalFormatObject(value, styleFn, undefined, {
        padding: padding,
        depth: depth + 1,
        maxDepth: maxDepth,
        objects: objects
      });
    }
  } else if (Array.isArray(value)) {
    if (depth >= maxDepth) {
      stringValue = '[Array...]';
    } else {
      return internalFormatArray(value, styleFn, { padding: padding, depth: depth + 1, maxDepth: maxDepth, objects: objects });
    }
  } else if (value instanceof Error) {
    var stack = value.stack;
    stringValue = stack.startsWith(value.message) ? stack : value.message + '\n' + stack;
  } else if (value instanceof Map || value instanceof WeakMap) {
    var name = value.constructor.name;
    if (depth >= maxDepth) {
      stringValue = '{' + name + '...}';
    } else {
      return internalFormatMap(name, value, styleFn, {
        padding: padding,
        depth: depth + 1,
        maxDepth: maxDepth,
        objects: objects
      });
    }
  } else if (value instanceof Set || value instanceof WeakSet) {
    var _name = value.constructor.name;
    if (depth >= maxDepth) {
      stringValue = '{' + _name + '...}';
    } else {
      return internalFormatSet(_name, value, styleFn, {
        padding: padding,
        depth: depth + 1,
        maxDepth: maxDepth,
        objects: objects
      });
    }
  } else {
    stringValue = tryStringify(value);
  }

  var formattedValue = styleFn(styles, stringValue);

  return {
    stringValue: stringValue,
    formattedValue: formattedValue
  };
}

var separator = ',';

var internalFormatKey = function internalFormatKey(key, styleFn) {
  if (!key) return { stringKey: '', formattedKey: '' };
  return {
    stringKey: key + ': ',
    formattedKey: styleFn(['gray-light', 'bold'], key + ':') + ' '
  };
};

var internalFormatMapKey = function internalFormatMapKey(key, styleFn, internalFormatParams) {
  var _internalFormatValue = internalFormatValue(key, noStyleFn, undefined, internalFormatParams),
      stringValue = _internalFormatValue.stringValue,
      formattedValue = _internalFormatValue.formattedValue;

  return {
    stringKey: stringValue + ' => ',
    formattedKey: styleFn(['gray-light', 'bold'], formattedValue + ':') + ' '
  };
};

var internalFormatIterator = function internalFormatIterator(values, styleFn, objectStyles, _ref2, _ref3) {
  var padding = _ref2.padding,
      depth = _ref2.depth,
      maxDepth = _ref2.maxDepth,
      objects = _ref2.objects;
  var prefix = _ref3.prefix,
      suffix = _ref3.suffix,
      _ref3$prefixSuffixSpa = _ref3.prefixSuffixSpace,
      prefixSuffixSpace = _ref3$prefixSuffixSpa === undefined ? ' ' : _ref3$prefixSuffixSpa,
      _ref3$formatKey = _ref3.formatKey,
      formatKey = _ref3$formatKey === undefined ? internalFormatKey : _ref3$formatKey;

  var breakLine = false;
  var formattedSeparator = function formattedSeparator() {
    return styleFn(['gray'], separator);
  };

  var valuesMaxIndex = values.length - 1;
  values = values.map(function (_ref4, index) {
    var key = _ref4.key,
        value = _ref4.value;

    var internalFormatParams = { padding: padding, depth: depth + 1, maxDepth: maxDepth, objects: objects };

    // key must be formatted before value (browser-formatter needs order)

    var _formatKey = formatKey(key, styleFn, internalFormatParams),
        stringKey = _formatKey.stringKey,
        formattedKey = _formatKey.formattedKey;

    var _internalFormatValue2 = internalFormatValue(value, styleFn, key && objectStyles && objectStyles[key], internalFormatParams),
        stringValue = _internalFormatValue2.stringValue,
        formattedValue = _internalFormatValue2.formattedValue;

    if (stringValue && (stringValue.length > 80 || stringValue.indexOf('\n') !== -1)) {
      breakLine = true;
      stringValue = stringValue.replace(/\n/g, '\n' + padding);
      formattedValue = formattedValue.replace(/\n/g, '\n' + padding);
    }

    return {
      stringValue: stringKey + stringValue + (index === valuesMaxIndex ? '' : separator),
      // eslint-disable-next-line no-useless-concat
      formattedValue: formattedKey + formattedValue + (index === valuesMaxIndex ? '' : formattedSeparator())
      // note: we need to format the separator for each values for browser-formatter
    };
  });

  return {
    stringValue: prefix + values.map(breakLine ? function (v) {
      return '\n' + padding + v.stringValue;
    } : function (fv) {
      return fv.stringValue;
    }).join(breakLine ? '\n' : ' ') + suffix,
    // eslint-disable-next-line prefer-template
    formattedValue: '' + prefix + (breakLine ? '' : prefixSuffixSpace) + values.map(breakLine ? function (v) {
      return '\n' + padding + v.formattedValue;
    } : function (v) {
      return v.formattedValue;
    }).join(breakLine ? '' : ' ') + ('' + (breakLine ? ',\n' : prefixSuffixSpace) + suffix)
  };
};

function internalFormatObject(object, styleFn, objectStyles, _ref5) {
  var padding = _ref5.padding,
      depth = _ref5.depth,
      maxDepth = _ref5.maxDepth,
      objects = _ref5.objects;

  if (objects.has(object)) {
    return sameRawFormattedValue('{Circular Object}');
  }

  var keys = Object.keys(object);
  if (keys.length === 0) {
    return sameRawFormattedValue('{}');
  }

  objects.add(object);

  var result = internalFormatIterator(keys.map(function (key) {
    return { key: key, value: object[key] };
  }), styleFn, objectStyles, { padding: padding, depth: depth, maxDepth: maxDepth, objects: objects }, { prefix: '{', suffix: '}' });

  objects.delete(object);

  return result;
}

function internalFormatMap(name, map, styleFn, _ref6) {
  var padding = _ref6.padding,
      depth = _ref6.depth,
      maxDepth = _ref6.maxDepth,
      objects = _ref6.objects;

  if (objects.has(map)) {
    return sameRawFormattedValue('{Circular ' + name);
  }

  var keys = Array.from(map.keys());
  if (keys.length === 0) {
    return sameRawFormattedValue(name + ' {}');
  }

  objects.add(map);

  var result = internalFormatIterator(keys.map(function (key) {
    return { key: key, value: map.get(key) };
  }), styleFn, undefined, { padding: padding, depth: depth, maxDepth: maxDepth, objects: objects }, { prefix: name + ' {', suffix: '}', formatKey: internalFormatMapKey });

  objects.delete(map);

  return result;
}

function internalFormatArray(array, styleFn, _ref7) {
  var padding = _ref7.padding,
      depth = _ref7.depth,
      maxDepth = _ref7.maxDepth,
      objects = _ref7.objects;

  if (objects.has(array)) {
    return sameRawFormattedValue('{Circular Array}');
  }

  if (array.length === 0) {
    return sameRawFormattedValue('[]');
  }

  objects.add(array);

  var result = internalFormatIterator(array.map(function (value) {
    return { key: undefined, value: value };
  }), styleFn, undefined, { padding: padding, depth: depth, maxDepth: maxDepth, objects: objects }, { prefix: '[', suffix: ']', prefixSuffixSpace: '' });

  objects.delete(array);

  return result;
}

function internalFormatSet(name, set$$1, styleFn, _ref8) {
  var padding = _ref8.padding,
      depth = _ref8.depth,
      maxDepth = _ref8.maxDepth,
      objects = _ref8.objects;

  if (objects.has(set$$1)) {
    return sameRawFormattedValue('{Circular ' + name);
  }

  var values = Array.from(set$$1.values());
  if (values.length === 0) {
    return sameRawFormattedValue(name + ' []');
  }

  objects.add(set$$1);

  var result = internalFormatIterator(values.map(function (value) {
    return { key: undefined, value: value };
  }), styleFn, undefined, { padding: padding, depth: depth, maxDepth: maxDepth, objects: objects }, { prefix: name + ' [', suffix: ']' });

  objects.delete(set$$1);

  return result;
}

function formatObject(object, styleFn, objectStyles) {
  var _ref9 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref9$padding = _ref9.padding,
      padding = _ref9$padding === undefined ? '  ' : _ref9$padding,
      _ref9$maxDepth = _ref9.maxDepth,
      maxDepth = _ref9$maxDepth === undefined ? 10 : _ref9$maxDepth;

  var _internalFormatObject = internalFormatObject(object, styleFn, objectStyles, {
    padding: padding,
    maxDepth: maxDepth,
    depth: 0,
    objects: new Set()
  }),
      result = _internalFormatObject.formattedValue;

  if (result === '{}') {
    return '';
  }

  return result;
}

function formatRecordToString(record, style) {
  var parts = [];

  if (record.displayName) {
    parts.push(style(['gray-light'], record.displayName));
  } else if (record.key) {
    parts.push(style(['gray-light'], record.key));
  }

  if (record.datetime) {
    parts.push(style(['gray', 'bold'], record.datetime.toTimeString().split(' ')[0]));
    /* new Date().toFormat('HH24:MI:SS') */
  }

  var message = record.symbol || levelToSymbol[record.level];
  var styles = record.styles || levelToStyles[record.level];

  if (record.message) {
    if (message) {
      message += ' ' + record.message;
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

  ['metadata', 'extra', 'context'].forEach(function (key) {
    if (!record[key]) {
      return;
    }

    var stringObject = formatObject(record[key], style, record[key + 'Styles']);

    if (!stringObject) {
      return;
    }

    parts.push(stringObject);
  });

  return parts.join(' ');
}

exports.levelToStyles = levelToStyles;
exports.levelToSymbol = levelToSymbol;
exports.styleToHtmlStyle = styleToHtmlStyle;
exports.styleToHexColor = hexColors;
exports.formatObject = formatObject;
exports.formatRecordToString = formatRecordToString;
//# sourceMappingURL=index-browser.cjs.js.map
