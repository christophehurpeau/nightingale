import { Level } from 'nightingale-levels';

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
    stringValue = stack != null && stack.startsWith(value.message) || stack != null && stack.startsWith(`${value.name}: ${value.message}`) ? stack : `${value.message}\n${stack || ""}`;
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

export { formatObject, formatRecordToString, levelToStyles, levelToSymbol, styleToHexColor, styleToHtmlStyleThemeDark, styleToHtmlStyleThemeLight };
//# sourceMappingURL=index-browser.es.js.map
