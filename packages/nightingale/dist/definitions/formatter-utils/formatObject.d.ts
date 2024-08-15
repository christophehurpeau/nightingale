import type { Styles } from "nightingale-types";
export interface FormatObjectOptions {
    padding?: string;
    maxDepth?: number;
}
export type StyleFn = (styles: Styles, value: string) => string;
export type ObjectStyles<Keys extends string = string> = Record<Keys, Styles>;
export declare function formatObject(object: Record<string, unknown>, styleFn?: StyleFn, objectStyles?: ObjectStyles, { padding, maxDepth }?: FormatObjectOptions): string;
//# sourceMappingURL=formatObject.d.ts.map