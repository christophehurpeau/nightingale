import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';
import { Styles, LogRecord } from 'nightingale-types';

export function style(styles: Styles, string: string): string {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  return `<span style="${styles
    .map((styleName: string) => styleToHtmlStyle[styleName].open)
    .join('; ')}">${string}</span>`;
}

/**
 * @param {Object} record
 * @returns {string}
 */
export default function format<T>(record: LogRecord<T>): string {
  return formatRecordToString(record, style);
}
