import type { Styles } from "nightingale-types";
import type {
  NightingaleFormatter,
  StyleToHtmlStyle,
} from "../formatter-utils";
import {
  formatRecordToString,
  styleToHtmlStyleThemeLight,
} from "../formatter-utils";

export function style(styles: Styles, string: string): string {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  return `<span style="${styles
    .map(
      (styleName) =>
        styleToHtmlStyleThemeLight[styleName as keyof StyleToHtmlStyle].open,
    )
    .join("; ")}">${string}</span>`;
}

export const HTMLFormatter: NightingaleFormatter = {
  format(record) {
    return formatRecordToString(record, style);
  },
};
