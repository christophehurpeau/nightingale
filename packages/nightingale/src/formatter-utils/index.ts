import type { LogRecord, Metadata } from "nightingale-types";

export { levelToStyles } from "./levelToStyles.ts";
export { levelToSymbol } from "./levelToSymbol.ts";
export {
  styleToHtmlStyleThemeDark,
  styleToHtmlStyleThemeLight,
} from "./styleToHtmlStyle.ts";
export type { StyleToHtmlStyle } from "./styleToHtmlStyle.ts";
export { styleToHexColor } from "./styleToHexColor.ts";
export { formatObject } from "./formatObject.ts";
export { formatRecordToString } from "./formatRecordToString.ts";

export interface NightingaleFormatter {
  format: <T extends Metadata>(record: LogRecord<T>) => [string, ...string[]];
}
