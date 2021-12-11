import type { StyleToHtmlStyle } from 'nightingale-formatter';
import type { LogRecord, Metadata, Styles } from 'nightingale-types';
export declare const style: (styleToHtmlStyle: StyleToHtmlStyle, args: string[]) => (styles: Styles, string: string) => string;
export declare function createBrowserConsoleFormatter(theme?: 'light' | 'dark'): <T extends Metadata>(record: LogRecord<T>) => string[];
//# sourceMappingURL=index.d.ts.map