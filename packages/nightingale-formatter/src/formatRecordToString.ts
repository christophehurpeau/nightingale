import type { LogRecord, Metadata } from 'nightingale-types';
import type { StyleFn, ObjectStyles } from './formatObject';
import { formatObject } from './formatObject';
import { levelToStyles } from './levelToStyles';
import { levelToSymbol } from './levelToSymbol';

export function formatRecordToString<T extends Metadata>(
  record: LogRecord<T>,
  style: StyleFn,
): string {
  const parts: string[] = [];

  if (record.displayName) {
    parts.push(style(['gray-light'], record.displayName));
  } else if (record.key) {
    parts.push(style(['gray-light'], record.key));
  }

  if (record.datetime) {
    parts.push(
      style(['gray', 'bold'], record.datetime.toTimeString().split(' ')[0]),
    );
    /* new Date().toFormat('HH24:MI:SS') */
  }

  let message: string = record.symbol || levelToSymbol[record.level];
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

  const formatRecordObject = (
    key: string,
    object: Record<string, unknown> | undefined,
    styles: ObjectStyles | undefined,
  ): void => {
    if (!object) {
      return;
    }

    const stringObject = formatObject(object, style, styles);

    if (!stringObject) {
      return;
    }

    parts.push(stringObject);
  };

  formatRecordObject('metadata', record.metadata, record.metadataStyles);
  formatRecordObject('extra', record.extra, undefined);
  formatRecordObject('context', record.context, undefined);

  return parts.join(' ');
}
