import type { Styles } from "nightingale-types";
import type { NightingaleFormatter } from "../formatter-utils";
import { formatRecordToString } from "../formatter-utils/index.ts";

export function style(styles: Styles, value: string): string {
  return value;
}

export const RawFormatter: NightingaleFormatter = {
  format(record) {
    return formatRecordToString(record, style);
  },
};
