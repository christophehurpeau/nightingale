import { Record } from 'nightingale-types';

export default function format<T>(record: Record<T>) {
  return JSON.stringify({
    key: record.key,
    level: record.level,
    datetime: record.datetime,
    message: record.message,
    metadata: record.metadata,
    extra: record.extra,
  });
}
