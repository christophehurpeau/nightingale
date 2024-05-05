import type { LogRecord, Metadata } from "nightingale-types";

function map2object(map: Map<unknown, unknown>): unknown {
  const object: Record<string, unknown> = {};

  map.forEach((value, key) => {
    if (typeof key === "object") {
      // ignore key
      return;
    }

    object[String(key)] = value;
  });

  return object;
}

function stringify(value: unknown, space?: number | string): string {
  return JSON.stringify(
    value,
    (key, objectValue) => {
      if (objectValue instanceof Map) {
        return map2object(objectValue);
      }
      if (objectValue instanceof Error) {
        return {
          message: objectValue.message,
          stack: objectValue.stack,
        };
      }

      return objectValue as unknown;
    },
    space
  );
}

export default function format<T extends Metadata>(
  record: LogRecord<T>
): string {
  return stringify({
    key: record.key,
    level: record.level,
    datetime: record.datetime,
    message: record.message,
    metadata: record.metadata,
    extra: record.extra,
  });
}
