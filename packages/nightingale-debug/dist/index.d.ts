import Level from 'nightingale-levels';
export declare type DebugValueType = string | RegExp | string[];
export declare type FindDebugLevel = (minLevel: Level, key: string) => Level;
export declare function createFindDebugLevel(debugValue?: DebugValueType): FindDebugLevel;
/** @deprecated use named export instead */
export default createFindDebugLevel;
//# sourceMappingURL=index.d.ts.map