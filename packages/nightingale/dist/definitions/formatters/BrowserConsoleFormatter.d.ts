import type { StyleToHtmlStyle } from "nightingale";
import type { LogRecord, Metadata, Styles } from "nightingale-types";
import type { StringArrayNightingaleFormatter } from "../formatter-utils";
export declare const style: (styleToHtmlStyle: StyleToHtmlStyle, args: string[]) => (styles: Styles, string: string) => string;
export declare class BrowserConsoleFormatter implements StringArrayNightingaleFormatter {
    styleToHtmlStyle: StyleToHtmlStyle;
    constructor(theme?: "dark" | "light");
    format<T extends Metadata>(record: LogRecord<T>): string[];
}
//# sourceMappingURL=BrowserConsoleFormatter.d.ts.map