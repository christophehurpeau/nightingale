import type { LogRecord, Metadata } from 'nightingale-types';

function map2object(map: Map<unknown, unknown>): unknown {
  const object: Record<string, unknown> = {};

  map.forEach((value, key) => {
    if (typeof key === 'object') {
      // ignore key
      return;
    }

    object[String(key)] = value;
  });

  return object;
}

function stringify(value: unknown, space?: string | number): string {
  return JSON.stringify(
    value,
    (key, value) => {
      if (value instanceof Map) {
        return map2object(value);
      }
      if (value instanceof Error) {
        return {
          message: value.message,
          stack: value.stack,
        };
      }

      return value as unknown;
    },
    space,
  );
}

export default function format<T extends Metadata>(
  record: LogRecord<T>,
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
