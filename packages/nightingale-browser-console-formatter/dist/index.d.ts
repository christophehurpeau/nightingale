import type { LogRecord, Styles } from 'nightingale-types';
export declare const style: (args: string[]) => (styles: Styles, string: string) => string;
export default function format<T>(record: LogRecord<T>): string[];
//# sourceMappingURL=index.d.ts.map