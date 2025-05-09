import type { StyleToHtmlStyle } from "nightingale";
import type { LogRecord, Metadata, Styles } from "nightingale-types";
import type { NightingaleFormatter } from "../formatter-utils";
export declare const style: (styleToHtmlStyle: StyleToHtmlStyle, args: string[]) => (styles: Styles, string: string) => string;
export declare class BrowserConsoleFormatter implements NightingaleFormatter {
    styleToHtmlStyle: StyleToHtmlStyle;
    constructor(theme?: "dark" | "light");
    format<T extends Metadata>(record: LogRecord<T>): [string, ...string[]];
}
//# sourceMappingURL=BrowserConsoleFormatter.d.ts.map