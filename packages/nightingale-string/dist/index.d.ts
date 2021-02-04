import type { Level, LogRecord, Metadata } from 'nightingale-types';
export declare class StringHandler {
    readonly minLevel: Level;
    private _buffer;
    constructor(minLevel: Level);
    get string(): string;
    handle<T extends Metadata>(record: LogRecord<T>): void;
}
/** @deprecated use named export instead */
export default StringHandler;
//# sourceMappingURL=index.d.ts.map