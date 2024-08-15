import type { Styles } from "nightingale-types";
import type { NightingaleFormatter } from "../formatter-utils";
import {
  formatRecordToString,
  styleToHtmlStyleThemeLight,
} from "../formatter-utils";

export function style(styles: Styles, string: string): string {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  return `<span style="${styles
    .map((styleName: string) => styleToHtmlStyleThemeLight[styleName].open)
    .join("; ")}">${string}</span>`;
}

export const HTMLFormatter: NightingaleFormatter = {
  format(record) {
    return formatRecordToString(record, style);
  },
};
