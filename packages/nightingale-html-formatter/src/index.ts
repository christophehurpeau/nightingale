import {
  formatRecordToString,
  styleToHtmlStyleThemeLight,
} from "nightingale-formatter";
import type { Styles, LogRecord, Metadata } from "nightingale-types";

export function style(styles: Styles, string: string): string {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  return `<span style="${styles
    .map((styleName: string) => styleToHtmlStyleThemeLight[styleName].open)
    .join("; ")}">${string}</span>`;
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
