import type { LogRecord, Metadata } from "nightingale-types";
export { levelToStyles } from "./levelToStyles";
export { levelToSymbol } from "./levelToSymbol";
export { styleToHtmlStyleThemeDark, styleToHtmlStyleThemeLight, } from "./styleToHtmlStyle";
export type { StyleToHtmlStyle } from "./styleToHtmlStyle";
export { styleToHexColor } from "./styleToHexColor";
export { formatObject } from "./formatObject";
export { formatRecordToString } from "./formatRecordToString";
export interface NightingaleFormatter {
    format: <T extends Metadata>(record: LogRecord<T>) => [string, ...string[]];
}
//# sourceMappingURL=index.d.ts.map