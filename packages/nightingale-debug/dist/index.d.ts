import Level from 'nightingale-levels';
export declare type DebugValueType = string | RegExp | Array<string>;
export declare type FindDebugLevel = (minLevel: Level, key: string) => Level;
export default function createFindDebugLevel(debugValue?: DebugValueType): FindDebugLevel;
//# sourceMappingURL=index.d.ts.map