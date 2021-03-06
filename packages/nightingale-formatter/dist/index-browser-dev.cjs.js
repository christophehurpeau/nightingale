'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Level = require('nightingale-levels');
var _extends = require('@babel/runtime/helpers/esm/extends');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var Level__default = /*#__PURE__*/_interopDefaultLegacy(Level);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

var levelToStyles = {
  [Level__default.TRACE]: ['gray'],
  [Level__default.DEBUG]: ['gray'],
  // [Level.INFO]: ['gray'],
  [Level__default.WARN]: ['yellow'],
  [Level__default.ERROR]: ['red', 'bold'],
  [Level__default.CRITICAL]: ['red', 'bold'],
  [Level__default.FATAL]: ['bgRed', 'white'],
  [Level__default.EMERGENCY]: ['bgRed', 'white']
};

var levelToSymbol = {
  [Level__default.TRACE]: '•',
  [Level__default.DEBUG]: '•',
  [Level__default.INFO]: '→',
  [Level__default.WARN]: '⚠',
  [Level__default.ERROR]: '✖',
  [Level__default.CRITICAL]: '!',
  [Level__default.FATAL]: '‼',
  [Level__default.EMERGENCY]: '‼'
};

var styleToHexColor = {
  orange: 'ff5f00',
  grayLight: '808080',
  'gray-light': '808080'
};

var styleToHtmlStyleThemeLight = {
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
    close: 'color: currentcolor'
  },
  red: {
    open: 'color: #ff0020',
    close: 'color: currentcolor'
  },
  green: {
    open: 'color: #00b317',
    close: 'color: currentcolor'
  },
  yellow: {
    open: 'color: #ffcc00',
    close: 'color: currentcolor'
  },
  blue: {
    open: 'color: #00a0ff',
    close: 'color: currentcolor'
  },
  magenta: {
    open: 'color: #ff00a0',
    close: 'color: currentcolor'
  },
  cyan: {
    open: 'color: #00cfd8',
    close: 'color: currentcolor'
  },
  white: {
    open: 'color: white',
    close: 'color: currentcolor'
  },
  gray: {
    open: 'color: gray',
    close: 'color: currentcolor'
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
    close: 'color: currentcolor'
  },
  grayLight: {
    open: `color: #${styleToHexColor.grayLight}`,
    close: 'color: currentcolor'
  },
  'gray-light': {
    open: `color: #${styleToHexColor.grayLight}`,
    close: 'color: currentcolor'
  }
};
var styleToHtmlStyleThemeDark = _extends__default({}, styleToHtmlStyleThemeLight, {
  black: styleToHtmlStyleThemeLight.white,
  bgBlack: styleToHtmlStyleThemeLight.bgWhite,
  white: styleToHtmlStyleThemeLight.black,
  bgWhite: styleToHtmlStyleThemeLight.bgBlack,
  gray: {
    open: 'color: lightgray',
    close: 'color: currentcolor'
  }
});

/* eslint-disable max-lines, @typescript-eslint/no-use-before-define */
var noStyleFn = function noStyleFn(styles, value) {
  return value;
};

function tryStringify(arg) {
  try {
    return JSON.stringify(arg).replace(/\\n/g, '\n');
  } catch (_unused) {
    return '[Circular]';
  }
}

var sameRawFormattedValue = function sameRawFormattedValue(value) {
  return {
    stringValue: value,
    formattedValue: value
  };
};

function internalFormatValue(value, styleFn, styles, _ref) {
  var padding = _ref.padding,
      depth = _ref.depth,
      maxDepth = _ref.maxDepth,
      objects = _ref.objects;
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

        case 'symbol':
          styles = ['magenta'];
          break;
      }
    }
  }

  var stringValue;

  if (value === null) {
    stringValue = 'null';
  } else if (value === undefined) {
    stringValue = 'undefined';
  } else if (typeofValue === 'boolean') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
    var stack = value.stack;
    stringValue = stack !== null && stack !== void 0 && stack.startsWith(value.message) ? stack : `${value.message}\n${stack || ''}`;
  } else if (value instanceof Map) {
    var name = value.constructor.name;

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
    var _name = value.constructor.name;

    if (depth >= maxDepth) {
      stringValue = `{${_name}...}`;
    } else {
      return internalFormatSet(_name, value, styleFn, {
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

  var formattedValue = styleFn(styles, stringValue);
  return {
    stringValue,
    formattedValue
  };
}

var separator = ',';

var internalFormatKey = function internalFormatKey(key, styleFn) {
  return {
    stringKey: `${key}: `,
    formattedKey: `${styleFn(['gray-light', 'bold'], `${key}:`)} `
  };
};

var internalNoKey = function internalNoKey() {
  return {
    stringKey: '',
    formattedKey: ''
  };
};

var internalFormatMapKey = function internalFormatMapKey(key, styleFn, internalFormatParams) {
  var _internalFormatValue = internalFormatValue(key, noStyleFn, undefined, internalFormatParams),
      stringValue = _internalFormatValue.stringValue,
      formattedValue = _internalFormatValue.formattedValue;

  return {
    stringKey: `${stringValue} => `,
    formattedKey: `${styleFn(['gray-light', 'bold'], `${formattedValue}:`)} `
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
      prefixSuffixSpace = _ref3$prefixSuffixSpa === void 0 ? ' ' : _ref3$prefixSuffixSpa,
      formatKey = _ref3.formatKey;
  var breakLine = false;

  var formattedSeparator = function formattedSeparator() {
    return styleFn(['gray'], separator);
  };

  var valuesMaxIndex = values.length - 1;
  var formattedValues = values.map(function (_ref4, index) {
    var key = _ref4.key,
        value = _ref4.value;
    var internalFormatParams = {
      padding,
      depth: depth + 1,
      maxDepth,
      objects
    }; // key must be formatted before value (browser-formatter needs order)

    var _formatKey = formatKey(key, styleFn, internalFormatParams),
        stringKey = _formatKey.stringKey,
        formattedKey = _formatKey.formattedKey;

    var _internalFormatValue2 = internalFormatValue(value, styleFn, key && objectStyles ? objectStyles[key] : undefined, internalFormatParams),
        stringValue = _internalFormatValue2.stringValue,
        formattedValue = _internalFormatValue2.formattedValue;

    if (stringValue && (stringValue.length > 80 || stringValue.includes('\n'))) {
      breakLine = true;
      stringValue = stringValue.replace(/\n/g, `\n${padding}`);
      formattedValue = formattedValue.replace(/\n/g, `\n${padding}`);
    }

    return {
      stringValue: stringKey + stringValue + (index === valuesMaxIndex ? '' : separator),
      formattedValue: formattedKey + formattedValue + (index === valuesMaxIndex ? '' : formattedSeparator()) // note: we need to format the separator for each values for browser-formatter

    };
  });
  return {
    stringValue: prefix + formattedValues.map(breakLine ? function (v) {
      return `\n${padding}${v.stringValue}`;
    } : function (fv) {
      return fv.stringValue;
    }).join(breakLine ? '\n' : ' ') + suffix,
    formattedValue: `${prefix}${breakLine ? '' : prefixSuffixSpace}${formattedValues.map(breakLine ? function (v) {
      return `\n${padding}${v.formattedValue}`;
    } : function (v) {
      return v.formattedValue;
    }).join(breakLine ? '' : ' ')}${breakLine ? ',\n' : prefixSuffixSpace}${suffix}`
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
    return {
      key,
      value: object[key]
    };
  }), styleFn, objectStyles, {
    padding,
    depth,
    maxDepth,
    objects
  }, {
    prefix: '{',
    suffix: '}',
    formatKey: internalFormatKey
  });
  objects.delete(object);
  return result;
}

function internalFormatMap(name, map, styleFn, _ref6) {
  var padding = _ref6.padding,
      depth = _ref6.depth,
      maxDepth = _ref6.maxDepth,
      objects = _ref6.objects;

  if (objects.has(map)) {
    return sameRawFormattedValue(`{Circular ${name}}`);
  }

  var keys = [].concat(map.keys());

  if (keys.length === 0) {
    return sameRawFormattedValue(`${name} {}`);
  }

  objects.add(map);
  var result = internalFormatIterator(keys.map(function (key) {
    return {
      key,
      value: map.get(key)
    };
  }), styleFn, undefined, {
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
    return {
      key: undefined,
      value
    };
  }), styleFn, undefined, {
    padding,
    depth,
    maxDepth,
    objects
  }, {
    prefix: '[',
    suffix: ']',
    prefixSuffixSpace: '',
    formatKey: internalNoKey
  });
  objects.delete(array);
  return result;
}

function internalFormatSet(name, set, styleFn, _ref8) {
  var padding = _ref8.padding,
      depth = _ref8.depth,
      maxDepth = _ref8.maxDepth,
      objects = _ref8.objects;

  if (objects.has(set)) {
    return sameRawFormattedValue(`{Circular ${name}}`);
  }

  var values = [].concat(set.values());

  if (values.length === 0) {
    return sameRawFormattedValue(`${name} []`);
  }

  objects.add(set);
  var result = internalFormatIterator(values.map(function (value) {
    return {
      key: undefined,
      value
    };
  }), styleFn, undefined, {
    padding,
    depth,
    maxDepth,
    objects
  }, {
    prefix: `${name} [`,
    suffix: ']',
    formatKey: internalNoKey
  });
  objects.delete(set);
  return result;
}

function formatObject(object, styleFn, objectStyles, _temp) {
  if (styleFn === void 0) {
    styleFn = noStyleFn;
  }

  var _ref9 = _temp === void 0 ? {} : _temp,
      _ref9$padding = _ref9.padding,
      padding = _ref9$padding === void 0 ? '  ' : _ref9$padding,
      _ref9$maxDepth = _ref9.maxDepth,
      maxDepth = _ref9$maxDepth === void 0 ? 10 : _ref9$maxDepth;

  var _internalFormatObject = internalFormatObject(object, styleFn, objectStyles, {
    padding,
    maxDepth,
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

  var formatRecordObject = function formatRecordObject(key, object, styles) {
    if (!object) {
      return;
    }

    var stringObject = formatObject(object, style, styles);

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

exports.formatObject = formatObject;
exports.formatRecordToString = formatRecordToString;
exports.levelToStyles = levelToStyles;
exports.levelToSymbol = levelToSymbol;
exports.styleToHexColor = styleToHexColor;
exports.styleToHtmlStyle = styleToHtmlStyleThemeLight;
exports.styleToHtmlStyleThemeDark = styleToHtmlStyleThemeDark;
exports.styleToHtmlStyleThemeLight = styleToHtmlStyleThemeLight;
//# sourceMappingURL=index-browser-dev.cjs.js.map
