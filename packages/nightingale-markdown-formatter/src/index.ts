import { formatRecordToString } from 'nightingale-formatter';
import type { Styles, LogRecord, Metadata } from 'nightingale-types';

export function style(styles: Styles, string: string): string {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  return styles.reduce((string, styleName) => {
    switch (styleName) {
      case 'bold':
        return `*${string}*`;
      case 'italic':
        return `_${string}_`;
      case 'strikethrough':
        return `~${string}~`;
    }

    return string;
  }, string);
}

export default function format<T extends Metadata>(
  record: LogRecord<T>,
): string {
  return formatRecordToString(record, style);
}
