import { Record } from 'nightingale-types';
export declare const style: (args: string[]) => (styles: string[] | undefined, string: string) => string;
/**
 * @param {Object} record
 * @returns {Array}
 */
export default function format<T>(record: Record<T>): string[];
