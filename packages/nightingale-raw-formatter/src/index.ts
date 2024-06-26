import { formatRecordToString } from "nightingale-formatter";
import type { LogRecord, Metadata, Styles } from "nightingale-types";

export function style(styles: Styles, value: string): string {
  return value;
}

/**
 * @param {Object} record
 * @returns {string}
 */
export default function format<T extends Metadata>(
  record: LogRecord<T>,
): string {
  return formatRecordToString(record, style);
}
