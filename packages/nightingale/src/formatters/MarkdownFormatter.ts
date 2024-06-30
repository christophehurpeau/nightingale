import type { Styles } from "nightingale-types";
import type { NightingaleFormatter } from "../formatter-utils";
import { formatRecordToString } from "../formatter-utils";

export function style(styles: Styles, string: string): string {
  if (!styles || styles.length === 0 || !string) {
    return string;
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  return styles.reduce((part, styleName) => {
    switch (styleName) {
      case "bold":
        return `*${part}*`;
      case "italic":
        return `_${part}_`;
      case "strikethrough":
        return `~${part}~`;

      // no default
    }

    return part;
  }, string);
}

export const MarkdownFormatter: NightingaleFormatter = {
  format(record) {
    return formatRecordToString(record, style);
  },
};
