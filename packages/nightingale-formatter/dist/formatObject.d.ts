import type { Styles } from 'nightingale-types';
export interface FormatObjectOptions {
    padding?: string;
    maxDepth?: number;
}
export declare type StyleFn = (styles: Styles, value: string) => string;
export interface ObjectStyles {
    [key: string]: Styles;
}
export default function formatObject(object: {
    [key: string]: any;
}, styleFn?: StyleFn, objectStyles?: ObjectStyles, { padding, maxDepth }?: FormatObjectOptions): string;
//# sourceMappingURL=formatObject.d.ts.map