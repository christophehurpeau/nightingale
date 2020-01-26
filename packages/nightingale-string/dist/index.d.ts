import { Level, LogRecord } from 'nightingale-types';
export default class StringHandler {
    readonly minLevel: Level;
    private _buffer;
    constructor(minLevel: Level);
    get string(): string;
    handle<T>(record: LogRecord<T>): void;
}
//# sourceMappingURL=index.d.ts.map