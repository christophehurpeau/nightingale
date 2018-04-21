import { Styles, Record } from 'nightingale-types';
import { formatRecordToString } from 'nightingale-formatter';

export function style(styles: Styles, string: string) {
  if (!styles || !styles.length || !string) {
    return string;
  }

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

export default function format<T>(record: Record<T>) {
  return formatRecordToString(record, style);
}
