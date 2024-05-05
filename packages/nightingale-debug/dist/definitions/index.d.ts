import { Level } from "nightingale-levels";
export type DebugValueType = RegExp | string[] | string;
export type FindDebugLevel = (minLevel: Level, key: string) => Level;
export declare function createFindDebugLevel(debugValue?: DebugValueType): FindDebugLevel;
//# sourceMappingURL=index.d.ts.map