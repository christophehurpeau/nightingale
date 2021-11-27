import { Level } from 'nightingale-levels';
import type { Metadata, MetadataStyles, Styles, Handler, Processor, LogRecord } from 'nightingale-types';
export { Level } from 'nightingale-levels';
export interface Options<T extends Metadata> {
    symbol?: string;
    metadataStyles?: MetadataStyles<T>;
    styles?: Styles;
}
export interface ComputedConfigForKey {
    handlers: Handler[];
    processors: Processor[];
}
interface ExtendedFunctionNameMetadata {
    functionName: string;
}
export interface Config {
    handler?: Handler;
    handlers?: Handler[];
    key?: string;
    keys?: string[];
    pattern?: RegExp;
    processor?: Processor;
    processors?: Processor[];
    stop?: boolean;
}
declare global {
    namespace NodeJS {
        interface Global {
            __NIGHTINGALE_CONFIG: Config[];
            __NIGHTINGALE_LOGGER_MAP_CACHE: Map<string, ComputedConfigForKey>;
            __NIGHTINGALE_CONFIG_DEFAULT: ComputedConfigForKey;
            __NIGHTINGALE_GLOBAL_HANDLERS: unknown;
            __NIGHTINGALE_GET_CONFIG_FOR_LOGGER: (key: string) => ComputedConfigForKey;
            __NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD: (key: string, level: number) => ComputedConfigForKey;
        }
    }
}
/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */
export declare class Logger {
    private contextObject?;
    readonly key: string;
    readonly displayName?: string;
    /**
     * Create a new Logger
     *
     * @param {string} key
     * @param {string} [displayName]
     */
    constructor(key: string, displayName?: string);
    /** @private */
    protected getHandlersAndProcessors(recordLevel: number): ComputedConfigForKey;
    /** @private */
    getConfig(): Readonly<ComputedConfigForKey>;
    /**
     * Create a child logger
     */
    child(childSuffixKey: string, childDisplayName?: string): Logger;
    /**
     * Create a new Logger with the same key a this attached context
     *
     * @example
     * ```typescript
     * const loggerMyService = new Logger('app:myService');
     * function someAction(arg1) {
     *     const logger = loggerMyService.context({ arg1 });
     *     logger.enter(someAction);
     *     // do stuff
     *     logger.info('info');
     *     // do stuff
     *     logger.exit(someAction);
     * }
     * ```
     *
     */
    context(context: Record<string, unknown>): Logger;
    /**
     * Get the context of this logger
     */
    getContextObject(): Readonly<Record<string, unknown>> | undefined;
    /**
     * Set the context of this logger
     *
     * @param {Object} context
     */
    setContext(context: Record<string, unknown>): void;
    /**
     * Extends existing context of this logger
     */
    extendsContext(extendedContext: Record<string, unknown>): void;
    /**
     * Handle a record
     *
     * Use this only if you know what you are doing.
     */
    addRecord<T extends Metadata>(record: Readonly<LogRecord<T>>): void;
    /**
     * Log a message
     */
    log<T extends Metadata>(messageOrError: string | Error, metadata?: T, level?: Level, options?: Options<T>): void;
    /**
     * Log a trace message
     */
    trace<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log a debug message
     */
    debug<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Notice an info message
     */
    notice<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an info message
     */
    info<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log a warn message
     */
    warn<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an error message
     *
     * @example
     * ```typescript
     * const logger = new Logger('something');
     * try {
     *   throw new Error('Always throws here');
     * } catch (error) {
     *   logger.error('caught error', { error });
     * }
     * ```
     */
    error<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an critical message
     */
    critical<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log a fatal message
     *
     * @example
     * ```typescript
     * const logger = new Logger('something');
     * try {
     *   throw new Error('Always throws here');
     * } catch (error) {
     *   logger.error('caught error', { error });
     *   process.exit(1);
     * }
     */
    fatal<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an alert message
     */
    alert<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an inspected value
     */
    inspectValue<T extends Metadata>(value: unknown, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log a debugged var
     */
    inspectVar<T extends Metadata>(varName: string, varValue: unknown, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Alias for infoSuccess
     */
    success<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an info success message
     */
    infoSuccess<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an debug success message
     */
    debugSuccess<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Alias for infoFail
     */
    fail<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an info fail message
     */
    infoFail<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an debug fail message
     */
    debugFail<T extends Metadata>(messageOrError: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * @returns {number} time to pass to timeEnd
     */
    time<T extends Metadata>(message?: string, metadata?: T, metadataStyles?: MetadataStyles<T>, level?: number): number;
    infoTime<T extends Metadata>(message?: string, metadata?: T, metadataStyles?: MetadataStyles<T>): number;
    /**
     * Finds difference between when this method
     * was called and when the respective time method
     * was called, then logs out the difference
     * and deletes the original record
     */
    timeEnd<T extends Metadata>(startTime: number, message: string, metadata?: T, metadataStyles?: MetadataStyles<T>, level?: number, options?: Options<T>): void;
    /**
     * Like timeEnd, but with INFO level
     */
    infoTimeEnd<T extends Metadata>(time: number, message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Like timeEnd, but with INFO level
     */
    infoSuccessTimeEnd<T extends Metadata>(time: number, message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an enter in a function
     *
     * @example
     * ```typescript
     * class A {
     *   method(arg1) {
     *     logger.enter(method, { arg1 });
     *     // Do your stuff
     *   }
     * }
     * ```
     *
     */
    enter<T extends Metadata, Fn extends (...args: unknown[]) => unknown>(fn: Fn, metadata?: T, metadataStyles?: MetadataStyles<T & ExtendedFunctionNameMetadata>): void;
    /**
     * Log an exit in a function
     *
     * @example
     * ```typescript
     * const logger = new Logger('myNamespace:A');
     * class A {
     *   method(arg1) {
     *     // Do your stuff
     *     logger.exit(method, { arg1 });
     *   }
     * }
     * ```
     */
    exit<T extends Metadata, Fn extends (...args: unknown[]) => unknown>(fn: Fn, metadata?: T, metadataStyles?: MetadataStyles<T & ExtendedFunctionNameMetadata>): void;
    /**
     * Wrap around a function to log enter and exit of a function
     *
     * @example
     * ```typescript
     * const logger = new Logger('myNamespace:A');
     * class A {
     *   method() {
     *     logger.wrap(method, () => {
     *       // Do your stuff
     *     });
     *   }
     * }
     * ```
     */
    wrap<Fn extends (...args: unknown[]) => unknown>(fn: Fn, callback: () => void): void;
    wrap<T extends Metadata, Fn extends (...args: unknown[]) => unknown>(fn: Fn, metadata: T, callback: () => void): void;
    wrap<T extends Metadata, Fn extends (...args: unknown[]) => unknown>(fn: Fn, metadata: T, metadataStyles: MetadataStyles<T>, callback: () => void): void;
}
/** @deprecated use named export instead */
export default Logger;
//# sourceMappingURL=index.d.ts.map