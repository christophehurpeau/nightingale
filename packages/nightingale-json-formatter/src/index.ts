import type { LogRecord } from 'nightingale-types';

function map2object(map: Map<any, any>): any {
  const object: any = {};

  map.forEach((value: any, key: any) => {
    if (typeof key === 'object') {
      // ignore key
      return;
    }

    object[key] = value;
  });

  return object;
}

function stringify(value: any, space?: string | number): string {
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

      return value;
    },
    space,
  );
}

export default function format<T>(record: LogRecord<T>): string {
  return stringify({
    key: record.key,
    level: record.level,
    datetime: record.datetime,
    message: record.message,
    metadata: record.metadata,
    extra: record.extra,
  });
}
