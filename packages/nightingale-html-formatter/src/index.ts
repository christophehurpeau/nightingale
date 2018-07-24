import { Styles, Record } from 'nightingale-types';
import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';

export function style(styles: Styles, string: string) {
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
export default function format<T>(record: Record<T>) {
  return formatRecordToString(record, style);
}
