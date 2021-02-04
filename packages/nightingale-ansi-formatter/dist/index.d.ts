import type { Styles, LogRecord, Metadata } from 'nightingale-types';
export declare function style(styles: Styles, string: string): string;
/**
 * @param {Object} record
 * @returns {string}
 */
export default function ansiFormat<T extends Metadata>(record: LogRecord<T>): string;
//# sourceMappingURL=index.d.ts.map