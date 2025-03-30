import type { NightingaleFormatter } from "../formatter-utils";

function map2object(map: Map<unknown, unknown>): unknown {
  const object: Record<string, unknown> = {};

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
    space,
  );
}

export const JSONFormatter: NightingaleFormatter = {
  format(record) {
    return stringify({
      key: record.key,
      level: record.level,
      datetime: record.datetime,
      message: record.message,
      metadata: record.metadata,
      extra: record.extra,
    });
  },
};

export const JSONCLIFormatter: NightingaleFormatter = {
  format(record) {
    return stringify({
      key: record.key,
      time: record.datetime.toTimeString().split(" ", 2)[0]!,
      message: record.message,
      ...record.metadata,
      ...record.extra,
    });
  },
};
