import type { Level, LogRecord, Metadata } from 'nightingale-types';
export default class StringHandler {
    readonly minLevel: Level;
    private _buffer;
    constructor(minLevel: Level);
    get string(): string;
    handle<T extends Metadata>(record: LogRecord<T>): void;
}
//# sourceMappingURL=index.d.ts.map