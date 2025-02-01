import { Logger } from 'nightingale-logger';
export { Logger } from 'nightingale-logger';
import { Level } from 'nightingale-levels';
export { Level, Level as levels } from 'nightingale-levels';
import ansi from 'ansi-styles';

const globalOrWindow = typeof global !== "undefined" ? global : window;
if (process.env.NODE_ENV !== "production" && globalOrWindow.__NIGHTINGALE_GLOBAL_HANDLERS) {
  throw new Error("nightingale: update all to ^5.0.0");
}
if (!globalOrWindow.__NIGHTINGALE_CONFIG) {
  globalOrWindow.__NIGHTINGALE_CONFIG = [];
  globalOrWindow.__NIGHTINGALE_LOGGER_MAP_CACHE = new Map();
  globalOrWindow.__NIGHTINGALE_CONFIG_DEFAULT = {
    handlers: [],
    processors: []
  };
}
function clearCache() {
  globalOrWindow.__NIGHTINGALE_LOGGER_MAP_CACHE.clear();
}
function handleConfig(config) {
  if (config.keys) {
    if (config.pattern) {
      throw new Error("Cannot have key and pattern for the same config");
    }
    if (config.key) {
      throw new Error("Cannot have key and keys for the same config");
    }
  } else if (config.key) {
    if (config.pattern) {
      throw new Error("Cannot have key and pattern for the same config");
    }
    config.keys = [config.key];
    delete config.key;
  }
  if (config.handler) {
    if (config.handlers) {
      throw new Error("Cannot have handler and handlers for the same config");
    }
    config.handlers = [config.handler];
    delete config.handler;
  }
  if (config.processor) {
    if (config.processors) {
      throw new Error("Cannot have processors and processors for the same config");
    }
    config.processors = [config.processor];
    delete config.processor;
  }
  return config;
}
function configure(config) {
  if (globalOrWindow.__NIGHTINGALE_CONFIG.length > 0) {
    // eslint-disable-next-line no-console
    console.log("nightingale: warning: config overridden");
  }
  clearCache();
  globalOrWindow.__NIGHTINGALE_CONFIG = config.map(handleConfig);
}
function addConfig(config, unshift = false) {
  config = handleConfig(config);
  globalOrWindow.__NIGHTINGALE_CONFIG[unshift ? "unshift" : "push"](config);
  clearCache();
}
const configIsForKey = key => config => {
  if (config.keys) return config.keys.includes(key);
  if (config.pattern) return config.pattern.test(key);
  return true;
};
globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = key => {
  const globalCache = globalOrWindow.__NIGHTINGALE_LOGGER_MAP_CACHE;
  const existingCache = globalCache.get(key);
  if (existingCache) {
    return existingCache;
  }
  const loggerConfig = {
    handlers: [],
    processors: []
  };
  globalOrWindow.__NIGHTINGALE_CONFIG.filter(configIsForKey(key)).some(config => {
    if (config.handlers) loggerConfig.handlers.push(...config.handlers);
    if (config.processors) loggerConfig.processors.push(...config.processors);
    return config.stop;
  });
  globalCache.set(key, loggerConfig);
  return loggerConfig;
};
if (globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = (key, level) => {
    const {
      handlers,
      processors
    } = globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);
    return {
      handlers: handlers.filter(handler => level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key))),
      processors
    };
  };
}

const levelToStyles = {
  [Level.TRACE]: ["gray"],
  [Level.DEBUG]: ["gray"],
  // [Level.INFO]: ['gray'],
  [Level.WARN]: ["yellow"],
  [Level.ERROR]: ["red", "bold"],
  [Level.CRITICAL]: ["red", "bold"],
  [Level.FATAL]: ["bgRed", "white"],
  [Level.EMERGENCY]: ["bgRed", "white"]
};

const levelToSymbol = {
  [Level.TRACE]: "•",
  [Level.DEBUG]: "•",
  [Level.INFO]: "→",
  [Level.WARN]: "⚠",
  [Level.ERROR]: "✖",
  [Level.CRITICAL]: "!",
  [Level.FATAL]: "‼",
  [Level.EMERGENCY]: "‼"
};

const styleToHexColor = {
  orange: "ff5f00",
  grayLight: "808080",
  "gray-light": "808080"
};

const styleToHtmlStyleThemeLight = {
  // text style
  bold: {
    open: "font-weight: bold",
    close: "font-weight: normal"
  },
  italic: {
    open: "font-style: italic",
    close: "font-style: normal"
  },
  underline: {
    open: "text-decoration: underline",
    close: "text-decoration: none"
  },
  inverse: {
    open: "unicode-bidi: bidi-override; direction: rtl",
    close: "unicode-bidi: normal; direction: ltr"
  },
  strikethrough: {
    open: "text-decoration: line-through",
    close: "text-decoration: none"
  },
  black: {
    open: "color: black",
    close: "color: currentcolor"
  },
  red: {
    open: "color: #ff0020",
    close: "color: currentcolor"
  },
  green: {
    open: "color: #00b317",
    close: "color: currentcolor"
  },
  yellow: {
    open: "color: #ffcc00",
    close: "color: currentcolor"
  },
  blue: {
    open: "color: #00a0ff",
    close: "color: currentcolor"
  },
  magenta: {
    open: "color: #ff00a0",
    close: "color: currentcolor"
  },
  cyan: {
    open: "color: #00cfd8",
    close: "color: currentcolor"
  },
  white: {
    open: "color: white",
    close: "color: currentcolor"
  },
  gray: {
    open: "color: gray",
    close: "color: currentcolor"
  },
  bgBlack: {
    open: "background: black",
    close: "background: initial"
  },
  bgRed: {
    open: "background: #ff0020",
    close: "background: initial"
  },
  bgGreen: {
    open: "background: #00b317",
    close: "background: initial"
  },
  bgYellow: {
    open: "background: #ffcc00",
    close: "background: initial"
  },
  bgBlue: {
    open: "background: #00a0ff",
    close: "background: initial"
  },
  bgMagenta: {
    open: "background: #ff00a0",
    close: "background: initial"
  },
  bgCyan: {
    open: "background: #00cfd8",
    close: "background: initial"
  },
  bgWhite: {
    open: "background: white",
    close: "background: initial"
  },
  orange: {
    open: `color: #${styleToHexColor.orange}`,
    close: "color: currentcolor"
  },
  grayLight: {
    open: `color: #${styleToHexColor.grayLight}`,
    close: "color: currentcolor"
  },
  "gray-light": {
    open: `color: #${styleToHexColor.grayLight}`,
    close: "color: currentcolor"
  }
};
const styleToHtmlStyleThemeDark = {
  ...styleToHtmlStyleThemeLight,
  black: styleToHtmlStyleThemeLight.white,
  bgBlack: styleToHtmlStyleThemeLight.bgWhite,
  white: styleToHtmlStyleThemeLight.black,
  bgWhite: styleToHtmlStyleThemeLight.bgBlack,
  gray: {
    open: "color: lightgray",
    close: "color: currentcolor"
  }
};

/* eslint-disable @typescript-eslint/no-use-before-define */

const noStyleFn = (styles, value) => value;
function tryStringify(arg) {
  try {
    return JSON.stringify(arg).replace(/\\n/g, "\n");
  } catch {
    return "[Circular]";
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
      styles = ["cyan"];
    } else {
      switch (typeofValue) {
        case "undefined":
          styles = ["cyan"];
          break;
        case "boolean":
          styles = ["green"];
          break;
        case "number":
          styles = ["yellow"];
          break;
        case "bigint":
          styles = ["red"];
          break;
        case "string":
          styles = ["orange"];
          break;
        case "symbol":
          styles = ["magenta"];
          break;
      }
    }
  }
  let stringValue;
  if (value === null) {
    stringValue = "null";
  } else if (value === undefined) {
    stringValue = "undefined";
  } else if (typeofValue === "boolean") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    stringValue = value.toString();
  } else if (value.constructor === Object) {
    if (depth >= maxDepth) {
      stringValue = "{Object...}";
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
      stringValue = "[Array...]";
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
    stringValue = stack?.startsWith(value.message) || stack?.startsWith(`${value.name}: ${value.message}`) ? stack : `${value.message}\n${stack || ""}`;
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
  } else if (typeofValue === "bigint") {
    stringValue = value.toString();
  } else if (typeofValue === "symbol") {
    stringValue = value.toString();
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
    stringValue = "{WeakMap...}";
  } else if (value instanceof WeakSet) {
    stringValue = "{WeakSet...}";
  } else {
    stringValue = tryStringify(value);
  }
  const formattedValue = styleFn(styles, stringValue);
  return {
    stringValue,
    formattedValue
  };
}
const separator = ",";
const internalFormatKey = (key, styleFn) => {
  return {
    stringKey: `${key}: `,
    formattedKey: `${styleFn(["gray-light", "bold"], `${key}:`)} `
  };
};
const internalNoKey = () => {
  return {
    stringKey: "",
    formattedKey: ""
  };
};
const internalFormatMapKey = (key, styleFn, internalFormatParams) => {
  const {
    stringValue,
    formattedValue
  } = internalFormatValue(key, noStyleFn, undefined, internalFormatParams);
  return {
    stringKey: `${stringValue} => `,
    formattedKey: `${styleFn(["gray-light", "bold"], `${formattedValue}:`)} `
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
  prefixSuffixSpace = " ",
  formatKey
}) => {
  let breakLine = false;
  const formattedSeparator = () => styleFn(["gray"], separator);
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
    };

    // key must be formatted before value (browser-formatter needs order)
    const {
      stringKey,
      formattedKey
    } = formatKey(key, styleFn, internalFormatParams);
    let {
      stringValue,
      formattedValue
    } = internalFormatValue(value, styleFn, key && objectStyles ? objectStyles[key] : undefined, internalFormatParams);
    if (stringValue && (stringValue.length > 80 || stringValue.includes("\n"))) {
      breakLine = true;
      stringValue = stringValue.replace(/\n/g, `\n${padding}`);
      formattedValue = formattedValue.replace(/\n/g, `\n${padding}`);
    }
    return {
      stringValue: stringKey + stringValue + (index === valuesMaxIndex ? "" : separator),
      formattedValue: formattedKey + formattedValue + (index === valuesMaxIndex ? "" : formattedSeparator())
      // note: we need to format the separator for each values for browser-formatter
    };
  });
  return {
    stringValue: prefix + formattedValues.map(breakLine ? v => `\n${padding}${v.stringValue}` : fv => fv.stringValue).join(breakLine ? "\n" : " ") + suffix,
    formattedValue: `${prefix}${breakLine ? "" : prefixSuffixSpace}${formattedValues.map(breakLine ? v => `\n${padding}${v.formattedValue}` : v => v.formattedValue).join(breakLine ? "" : " ")}${breakLine ? ",\n" : prefixSuffixSpace}${suffix}`
  };
};
function internalFormatObject(object, styleFn, objectStyles, {
  padding,
  depth,
  maxDepth,
  objects
}) {
  if (objects.has(object)) {
    return sameRawFormattedValue("{Circular Object}");
  }
  const keys = Object.keys(object);
  if (keys.length === 0) {
    return sameRawFormattedValue("{}");
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
    prefix: "{",
    suffix: "}",
    formatKey: internalFormatKey
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
  const keys = [...map.keys()];
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
    suffix: "}",
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
    return sameRawFormattedValue("{Circular Array}");
  }
  if (array.length === 0) {
    return sameRawFormattedValue("[]");
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
    prefix: "[",
    suffix: "]",
    prefixSuffixSpace: "",
    formatKey: internalNoKey
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
  const values = [...set.values()];
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
    suffix: "]",
    formatKey: internalNoKey
  });
  objects.delete(set);
  return result;
}
function formatObject(object, styleFn = noStyleFn, objectStyles, {
  padding = "  ",
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
  if (result === "{}") {
    return "";
  }
  return result;
}

function formatRecordToString(record, style) {
  const parts = [];
  if (record.displayName) {
    parts.push(style(["gray-light"], record.displayName));
  } else if (record.key) {
    parts.push(style(["gray-light"], record.key));
  }
  if (record.datetime) {
    parts.push(style(["gray", "bold"], record.datetime.toTimeString().split(" ")[0]));
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
  const formatRecordObject = (key, object, objectStyles) => {
    if (!object) {
      return;
    }
    const stringObject = formatObject(object, style, objectStyles);
    if (!stringObject) {
      return;
    }
    parts.push(stringObject);
  };
  formatRecordObject("metadata", record.metadata, record.metadataStyles);
  formatRecordObject("extra", record.extra, undefined);
  formatRecordObject("context", record.context, undefined);
  return parts.join(" ");
}

/* eslint-disable complexity */
const specialRegexpChars = /[$()+.?[\\\]^{|}]/;
const createTestFunctionFromRegexp = regexp => string => regexp.test(string);
const createTestFunctionFromRegexpString = value => {
  if (!value.endsWith("/")) throw new Error("Invalid RegExp DEBUG value");
  return createTestFunctionFromRegexp(new RegExp(value.slice(1, -1)));
};
const createTestFunctionFromValue = value => {
  if (value.endsWith(":*")) {
    value = value.slice(0, -2);
    return string => string.startsWith(value);
  }
  return string => string === value;
};
function createFindDebugLevel(debugValue) {
  let isWildcard = false;
  const debugValues = [];
  const skips = [];
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
    debugValue.forEach(value => {
      if (specialRegexpChars.test(value)) {
        throw new Error(`Invalid debug value: "${value}" (contains special chars)`);
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
      return (minLevel, key) => skips.some(skip => skip(key)) ? minLevel : Level.ALL;
    }
  }
  if (debugValues.length === 0) {
    return minLevel => minLevel;
  }
  return (minLevel, key) => {
    if (minLevel === Level.ALL || !key) {
      return minLevel;
    }
    if (debugValues.some(dv => dv(key))) {
      return skips.some(skip => skip(key)) ? minLevel : Level.ALL;
    }
    return minLevel;
  };
}

function style$4(styles, value) {
  return value;
}
const RawFormatter = {
  format(record) {
    return formatRecordToString(record, style$4);
  }
};

function style$3(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  return styles.reduce((part, styleName) => {
    switch (styleName) {
      case "bold":
        return `*${part}*`;
      case "italic":
        return `_${part}_`;
      case "strikethrough":
        return `~${part}~`;

      // no default
    }
    return part;
  }, string);
}
const MarkdownFormatter = {
  format(record) {
    return formatRecordToString(record, style$3);
  }
};

function map2object(map) {
  const object = {};
  map.forEach((value, key) => {
    if (typeof key === "object") {
      // ignore key
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    object[String(key)] = value;
  });
  return object;
}
function stringify(value, space) {
  return JSON.stringify(value, (key, objectValue) => {
    if (objectValue instanceof Map) {
      return map2object(objectValue);
    }
    if (objectValue instanceof Error) {
      return {
        message: objectValue.message,
        stack: objectValue.stack
      };
    }
    return objectValue;
  }, space);
}
const JSONFormatter = {
  format(record) {
    return stringify({
      key: record.key,
      level: record.level,
      datetime: record.datetime,
      message: record.message,
      metadata: record.metadata,
      extra: record.extra
    });
  }
};

const ansiStyles = {
  black: ansi.black,
  red: ansi.red,
  green: ansi.green,
  yellow: ansi.yellow,
  blue: ansi.blue,
  magenta: ansi.magenta,
  cyan: ansi.cyan,
  white: ansi.white,
  gray: ansi.gray,
  bgBlack: ansi.bgBlack,
  bgRed: ansi.bgRed,
  bgGreen: ansi.bgGreen,
  bgYellow: ansi.bgYellow,
  bgBlue: ansi.bgBlue,
  bgMagenta: ansi.bgMagenta,
  bgCyan: ansi.bgCyan,
  bgWhite: ansi.bgWhite,
  bold: ansi.bold,
  underline: ansi.underline,
  // http://www.calmar.ws/vim/256-xterm-24bit-rgb-color-chart.html
  orange: {
    open: ansi.color.ansi256(ansi.hexToAnsi256(styleToHexColor.orange)),
    close: ansi.color.close
  },
  "gray-light": {
    open: ansi.color.ansi256(ansi.hexToAnsi256(styleToHexColor["gray-light"])),
    close: ansi.color.close
  }
};
function style$2(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  return styles.reduce((styledString, styleName) => {
    const codePair = ansiStyles[styleName];
    if (!codePair) {
      throw new Error(`Unknown style: ${styleName}`);
    }
    return codePair.open + styledString + codePair.close;
  }, string);
}
const ANSIFormatter = {
  format: record => formatRecordToString(record, style$2)
};

function style$1(styles, string) {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }
  return `<span style="${styles.map(styleName => styleToHtmlStyleThemeLight[styleName].open).join("; ")}">${string}</span>`;
}
const HTMLFormatter = {
  format(record) {
    return formatRecordToString(record, style$1);
  }
};

const style = (styleToHtmlStyle, args) => (styles, string) => {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }
  const htmlStyles = styles.map(styleName => styleToHtmlStyle[styleName]);
  args.push(htmlStyles.map(s => s.open).join("; "), htmlStyles.map(s => s.close).join("; "));
  return `%c${string}%c`;
};
class BrowserConsoleFormatter {
  constructor(theme = "light") {
    this.styleToHtmlStyle = theme === "dark" ? styleToHtmlStyleThemeDark : styleToHtmlStyleThemeLight;
  }
  format(record) {
    const args = [];
    const string = formatRecordToString(record, style(this.styleToHtmlStyle, args));
    return [string, ...args];
  }
}

/* eslint-disable no-console */
function consoleOutput(param, record) {
  console[record.level >= Level.ERROR ? "error" : "log"](...param);
}

/* eslint-disable prefer-template */

class StringHandler {
  _buffer = "";
  constructor(minLevel) {
    this.minLevel = minLevel;
  }
  get string() {
    return this._buffer;
  }
  handle(record) {
    this._buffer += RawFormatter.format(record) + "\n";
  }
}

function getDebugString() {
  const querystring = document.location.search;
  const debugFromLocalStorage =
  // eslint-disable-next-line unicorn/prefer-global-this, @typescript-eslint/no-unnecessary-condition
  window.localStorage?.getItem("debug") || "";
  if (!querystring) {
    return debugFromLocalStorage;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
  const debugFromQueryString = decodeURI(querystring.replace(
  // eslint-disable-next-line prefer-regex-literals, regexp/no-super-linear-backtracking
  new RegExp("^(?:.*[&?]DEBUG(?:=([^&]*))?)?.*$", "i"), "$1"));
  return (debugFromLocalStorage ? `${debugFromLocalStorage},` : "") + debugFromQueryString;
}

// debug string can change any time (localStorage), so we need a new object each time.
const findDebugLevel$1 = (minLevel, key) => createFindDebugLevel(getDebugString())(minLevel, key);
const getDefaultTheme = () => {
  try {
    const configInLocalStorage = localStorage.getItem("NIGHTINGALE_THEME");
    if (configInLocalStorage && configInLocalStorage === "dark") {
      return configInLocalStorage;
    }
  } catch {}
  return "light";
};
const createHandler = (theme = getDefaultTheme()) => {
  const browserConsoleFormatter = new BrowserConsoleFormatter(theme);
  return record => {
    consoleOutput(browserConsoleFormatter.format(record), record);
  };
};
class BrowserConsoleHandler {
  minLevel = 0;
  constructor(minLevel, options = {}) {
    this.isHandling = (level, key) => level >= findDebugLevel$1(minLevel, key);
    this.handle = createHandler(options.theme);
  }
}

const defaultFormatter = ANSIFormatter.format;
const createHandle = (formatter = defaultFormatter, output = consoleOutput) => {
  return record => {
    output(formatter(record), record);
  };
};
const findDebugLevel = createFindDebugLevel(process.env.DEBUG);
class ConsoleHandler {
  minLevel = (() => Level.ALL)();
  constructor(minLevel, options = {}) {
    this.minLevel = minLevel;
    this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);
    this.handle = createHandle(options.formatter, options.output);
  }
}

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */
function listenUnhandledErrors(logger = new Logger("nightingale:listenUnhandledErrors", "UnhandledErrors")) {
  process.on("uncaughtException", error => {
    logger.error(error, {
      unhandled: true,
      type: "uncaughtException"
    });
  });
  process.on("unhandledRejection", error => {
    logger.error(error, {
      unhandled: true,
      type: "unhandledRejection"
    });
  });
}

export { ANSIFormatter, BrowserConsoleFormatter, BrowserConsoleHandler, ConsoleHandler, HTMLFormatter, JSONFormatter, MarkdownFormatter, RawFormatter, StringHandler, addConfig, configure, consoleOutput, createFindDebugLevel, formatObject, formatRecordToString, levelToStyles, levelToSymbol, listenUnhandledErrors, styleToHexColor, styleToHtmlStyleThemeDark, styleToHtmlStyleThemeLight };
//# sourceMappingURL=index-browser.es.js.map
