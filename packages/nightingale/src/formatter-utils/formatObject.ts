/* eslint-disable @typescript-eslint/no-use-before-define */
import type { Styles } from "nightingale-types";

export interface FormatObjectOptions {
  padding?: string;
  maxDepth?: number;
}

export type StyleFn = (styles: Styles, value: string) => string;

export type ObjectStyles<Keys extends string = string> = Record<Keys, Styles>;

const noStyleFn: StyleFn = (styles: Styles, value: string): string => value;

interface InternalFormatParams {
  padding: string;
  depth: number;
  maxDepth: number;
  objects: Set<unknown>;
}

interface FormattedKey {
  stringKey: string;
  formattedKey: string;
}

type FormatKey<Key> = (
  key: Key,
  styleFn: StyleFn,
  internalFormatParams: InternalFormatParams,
) => FormattedKey;

interface Value<Key> {
  key: Key;
  value: unknown;
}

interface FormattedValue {
  stringValue: string;
  formattedValue: string;
}

type Values<Key> = Value<Key>[];

interface InternalFormatIteratorParams<Key> {
  prefix: string;
  suffix: string;
  formatKey: FormatKey<Key>;
  prefixSuffixSpace?: string;
}

function tryStringify(arg: unknown): string {
  try {
    return JSON.stringify(arg).replace(/\\n/g, "\n");
  } catch {
    return "[Circular]";
  }
}

const sameRawFormattedValue = (value: string): FormattedValue => ({
  stringValue: value,
  formattedValue: value,
});

function internalFormatValue(
  value: unknown,
  styleFn: StyleFn,
  styles: Styles,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
): FormattedValue {
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
        case "object":
        case "function":
        default:
          break;
      }
    }
  }

  let stringValue: string;
  if (value === null) {
    stringValue = "null";
  } else if (value === undefined) {
    stringValue = "undefined";
  } else if (typeofValue === "boolean") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    stringValue = (value as any).toString() as string;
  } else if ((value as () => unknown).constructor === Object) {
    if (depth >= maxDepth) {
      stringValue = "{Object...}";
    } else {
      return internalFormatObject(
        value as Record<string, unknown>,
        styleFn,
        undefined,
        {
          padding,
          depth: depth + 1,
          maxDepth,
          objects,
        },
      );
    }
  } else if (Array.isArray(value)) {
    if (depth >= maxDepth) {
      stringValue = "[Array...]";
    } else {
      return internalFormatArray(value, styleFn, {
        padding,
        depth: depth + 1,
        maxDepth,
        objects,
      });
    }
  } else if (value instanceof Error) {
    const stack = value.stack;
    stringValue =
      stack?.startsWith(value.message) ||
      stack?.startsWith(`${value.name}: ${value.message}`)
        ? stack
        : `${value.message}\n${stack || ""}`;
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
  } else if (typeofValue === "bigint") {
    stringValue = (value as bigint).toString();
  } else if (typeofValue === "symbol") {
    stringValue = (value as symbol).toString();
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
    stringValue = "{WeakMap...}";
  } else if (value instanceof WeakSet) {
    stringValue = "{WeakSet...}";
  } else {
    stringValue = tryStringify(value);
  }

  const formattedValue = styleFn(styles, stringValue);

  return {
    stringValue,
    formattedValue,
  };
}

const separator = ",";

const internalFormatKey: FormatKey<string> = (
  key: string,
  styleFn: StyleFn,
  internalFormatParams: InternalFormatParams,
): FormattedKey => {
  return {
    stringKey: `${key}: `,
    formattedKey: `${styleFn(["gray-light", "bold"], `${key}:`)} `,
  };
};

const internalNoKey: FormatKey<undefined> = (
  key: string | undefined,
  styleFn: StyleFn,
  internalFormatParams: InternalFormatParams,
): FormattedKey => {
  return { stringKey: "", formattedKey: "" };
};

const internalFormatMapKey: FormatKey<unknown> = (
  key: unknown,
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
    stringKey: `${stringValue} => `,
    formattedKey: `${styleFn(["gray-light", "bold"], `${formattedValue}:`)} `,
  };
};

const internalFormatIterator = <Key>(
  values: Values<Key>,
  styleFn: StyleFn,
  objectStyles: ObjectStyles | undefined,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
  {
    prefix,
    suffix,
    prefixSuffixSpace = " ",
    formatKey,
  }: InternalFormatIteratorParams<Key>,
): FormattedValue => {
  let breakLine = false;
  const formattedSeparator = (): string => styleFn(["gray"], separator);

  const valuesMaxIndex = values.length - 1;
  const formattedValues: FormattedValue[] = values.map(
    ({ key, value }, index: number) => {
      const nextDepth = depth + 1;
      const internalFormatParams = {
        padding,
        depth: nextDepth,
        maxDepth,
        objects,
      };

      // key must be formatted before value (browser-formatter needs order)
      const { stringKey, formattedKey } = formatKey(
        key,
        styleFn,
        internalFormatParams,
      );

      let { stringValue, formattedValue } = internalFormatValue(
        value,
        styleFn,
        key && objectStyles
          ? objectStyles[key as unknown as string]
          : undefined,
        internalFormatParams,
      );

      if (
        stringValue &&
        (stringValue.length > 80 || stringValue.includes("\n"))
      ) {
        breakLine = true;
        stringValue = stringValue.replace(/\n/g, `\n${padding}`);
        formattedValue = formattedValue.replace(/\n/g, `\n${padding}`);
      }

      return {
        stringValue:
          stringKey + stringValue + (index === valuesMaxIndex ? "" : separator),
        formattedValue:
          formattedKey +
          formattedValue +
          (index === valuesMaxIndex ? "" : formattedSeparator()),
        // note: we need to format the separator for each values for browser-formatter
      };
    },
  );

  return {
    stringValue:
      prefix +
      formattedValues
        .map(
          breakLine
            ? (v) => `\n${padding}${v.stringValue}`
            : (fv) => fv.stringValue,
        )
        .join(breakLine ? "\n" : " ") +
      suffix,
    formattedValue: `${prefix}${
      breakLine ? "" : prefixSuffixSpace
    }${formattedValues
      .map(
        breakLine
          ? (v) => `\n${padding}${v.formattedValue}`
          : (v) => v.formattedValue,
      )
      .join(breakLine ? "" : " ")}${
      breakLine ? ",\n" : prefixSuffixSpace
    }${suffix}`,
  };
};

function internalFormatObject(
  object: Record<string, unknown>,
  styleFn: StyleFn,
  objectStyles: ObjectStyles | undefined,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
): FormattedValue {
  if (objects.has(object)) {
    return sameRawFormattedValue("{Circular Object}");
  }

  const keys: string[] = Object.keys(object);
  if (keys.length === 0) {
    return sameRawFormattedValue("{}");
  }

  objects.add(object);

  const result = internalFormatIterator(
    keys.map((key) => ({ key, value: object[key] })),
    styleFn,
    objectStyles,
    { padding, depth, maxDepth, objects },
    { prefix: "{", suffix: "}", formatKey: internalFormatKey },
  );

  objects.delete(object);

  return result;
}

function internalFormatMap(
  name: string,
  map: Map<unknown, unknown>,
  styleFn: StyleFn,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
): FormattedValue {
  if (objects.has(map)) {
    return sameRawFormattedValue(`{Circular ${name}}`);
  }

  const keys = [...map.keys()];
  if (keys.length === 0) {
    return sameRawFormattedValue(`${name} {}`);
  }

  objects.add(map);

  const result = internalFormatIterator(
    keys.map((key) => ({ key, value: map.get(key) })),
    styleFn,
    undefined,
    { padding, depth, maxDepth, objects },
    { prefix: `${name} {`, suffix: "}", formatKey: internalFormatMapKey },
  );

  objects.delete(map);

  return result;
}

function internalFormatArray(
  array: unknown[],
  styleFn: StyleFn,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
): FormattedValue {
  if (objects.has(array)) {
    return sameRawFormattedValue("{Circular Array}");
  }

  if (array.length === 0) {
    return sameRawFormattedValue("[]");
  }

  objects.add(array);

  const result = internalFormatIterator(
    array.map((value) => ({ key: undefined, value })),
    styleFn,
    undefined,
    { padding, depth, maxDepth, objects },
    {
      prefix: "[",
      suffix: "]",
      prefixSuffixSpace: "",
      formatKey: internalNoKey,
    },
  );

  objects.delete(array);

  return result;
}

function internalFormatSet(
  name: string,
  set: Set<unknown>,
  styleFn: StyleFn,
  { padding, depth, maxDepth, objects }: InternalFormatParams,
): FormattedValue {
  if (objects.has(set)) {
    return sameRawFormattedValue(`{Circular ${name}}`);
  }

  const values = [...set.values()];
  if (values.length === 0) {
    return sameRawFormattedValue(`${name} []`);
  }

  objects.add(set);

  const result = internalFormatIterator(
    values.map((value) => ({ key: undefined, value })),
    styleFn,
    undefined,
    { padding, depth, maxDepth, objects },
    { prefix: `${name} [`, suffix: "]", formatKey: internalNoKey },
  );

  objects.delete(set);

  return result;
}

export function formatObject(
  object: Record<string, unknown>,
  styleFn: StyleFn = noStyleFn,
  objectStyles?: ObjectStyles,
  { padding = "  ", maxDepth = 10 }: FormatObjectOptions = {},
): string {
  const { formattedValue: result } = internalFormatObject(
    object,
    styleFn,
    objectStyles,
    {
      padding,
      maxDepth,
      depth: 0,
      objects: new Set(),
    },
  );

  if (result === "{}") {
    return "";
  }

  return result;
}
