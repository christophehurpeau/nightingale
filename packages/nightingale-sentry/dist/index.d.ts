import type { User } from '@sentry/node';
import Level from 'nightingale-levels';
import type { LogRecord, Handle, Metadata } from 'nightingale-types';
export interface Options {
    getUser?: <T extends Metadata>(record: LogRecord<T>) => User;
    getTags?: <T extends Metadata>(record: LogRecord<T>) => Record<string, string>;
}
export interface MetadataWithError extends Metadata {
    error?: Error;
}
export default class SentryHandler {
    minLevel: Level;
    handle: Handle;
    constructor(ravenUrl: string, minLevel: number, options?: Options);
}
//# sourceMappingURL=index.d.ts.map