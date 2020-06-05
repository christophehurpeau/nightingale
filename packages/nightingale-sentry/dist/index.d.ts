import Level from 'nightingale-levels';
import type { LogRecord, Handle } from 'nightingale-types';
export interface Options {
    getUser?: <T>(record: LogRecord<T>) => any;
    getTags?: <T>(record: LogRecord<T>) => any;
}
export interface MetadataWithError {
    error?: Error;
}
export default class SentryHandler {
    minLevel: Level;
    handle: Handle;
    constructor(ravenUrl: string, minLevel: number, options?: Options);
}
//# sourceMappingURL=index.d.ts.map