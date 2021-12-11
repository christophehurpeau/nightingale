import type { addBreadcrumb, captureException, captureMessage } from '@sentry/core';
import type { User } from '@sentry/types';
import { Level } from 'nightingale-levels';
import type { LogRecord, Handle, Metadata, Handler } from 'nightingale-types';
export interface MetadataWithError extends Metadata {
    error?: Error;
}
export interface Options {
    getUser?: <T extends MetadataWithError>(record: LogRecord<T>) => User | undefined;
    getTags?: <T extends MetadataWithError>(record: LogRecord<T>) => Record<string, string>;
    getBreadcrumbCategory?: <T extends Metadata>(record: LogRecord<T>) => string | undefined;
    getBreadcrumbType?: <T extends Metadata>(record: LogRecord<T>) => string | undefined;
    shouldSendAsException?: <T extends MetadataWithError>(record: LogRecord<T>) => boolean;
    shouldSendAsBreadcrumb?: <T extends Metadata>(record: LogRecord<T>) => boolean;
}
interface SentryRequiredMethods {
    addBreadcrumb: typeof addBreadcrumb;
    captureException: typeof captureException;
    captureMessage: typeof captureMessage;
}
export declare class SentryHandler<S extends SentryRequiredMethods> implements Handler {
    minLevel: Level;
    handle: Handle;
    constructor(Sentry: string | S, minLevel: Level, options?: Options);
}
export {};
//# sourceMappingURL=index.d.ts.map