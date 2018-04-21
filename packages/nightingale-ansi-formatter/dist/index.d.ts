import { Styles, Record } from 'nightingale-types';
declare module 'ansi-styles' {
    const color: {
        close: string;
        ansi256: {
            hex: (hex: string) => string;
        };
    };
}
export declare function style(styles: Styles, string: string): string;
/**
 * @param {Object} record
 * @returns {string}
 */
export default function format<T>(record: Record<T>): string;
