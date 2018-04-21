import { Record, Styles } from 'nightingale-types';
import { formatRecordToString } from 'nightingale-formatter';

export function style(styles: Styles, value: string) {
  return value;
}

/**
 * @param {Object} record
 * @returns {string}
 */
export default function format<T>(record: Record<T>) {
  return formatRecordToString(record, style);
}
