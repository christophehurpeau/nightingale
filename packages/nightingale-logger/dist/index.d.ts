import Level from 'nightingale-levels';
import type { Metadata, MetadataStyles, Styles, Handler, Processor, LogRecord } from 'nightingale-types';
export { Level };
export interface Options<T> {
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
/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */
export default class Logger {
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
     * const loggerMyService = new Logger('app.myService');
     * function someAction(arg1) {
     *     const logger = loggerMyService.context({ arg1 });
     *     logger.info('starting');
     *     // do stuff
     *     logger.info('done');
     * }
     *
     */
    context(context: object): Logger;
    /**
     * Get the context of this logger
     */
    getContextObject(): Readonly<object> | undefined;
    /**
     * Set the context of this logger
     *
     * @param {Object} context
     */
    setContext(context: object): void;
    /**
     * Extends existing context of this logger
     */
    extendsContext(extendedContext: Record<string, any>): void;
    /**
     * Handle a record
     *
     * Use this only if you know what you are doing.
     */
    addRecord<T extends Metadata>(record: Readonly<LogRecord<T>>): void;
    /**
     * Log a message
     */
    log<T extends Metadata>(message: string, metadata?: T, level?: Level, options?: Options<T>): void;
    /**
     * Log a trace message
     */
    trace<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log a debug message
     */
    debug<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Notice an info message
     */
    notice<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an info message
     */
    info<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log a warn message
     */
    warn<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an error message
     */
    error<T extends Metadata>(message: string | Error, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an critical message
     */
    critical<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log a fatal message
     */
    fatal<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an alert message
     */
    alert<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an inspected value
     */
    inspectValue<T extends Metadata>(value: any, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log a debugged var
     */
    inspectVar<T extends Metadata>(varName: string, varValue: any, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
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
    fail<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an info fail message
     */
    infoFail<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
    /**
     * Log an debug fail message
     */
    debugFail<T extends Metadata>(message: string, metadata?: T, metadataStyles?: MetadataStyles<T>): void;
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
     * class A {
     *   method(arg1) {
     *     logger.enter(method, { arg1 });
     *     // Do your stuff
     *   }
     * }
     *
     */
    enter<T extends Metadata>(fn: Function, metadata?: T, metadataStyles?: MetadataStyles<T & ExtendedFunctionNameMetadata>): void;
    /**
     * Log an exit in a function
     *
     * @example
     * const logger = new ConsoleLogger('myNamespace.A');
     * class A {
     *   method(arg1) {
     *     // Do your stuff
     *     logger.exit(method, { arg1 });
     *   }
     * }
     */
    exit<T extends Metadata>(fn: Function, metadata?: T, metadataStyles?: MetadataStyles<T & ExtendedFunctionNameMetadata>): void;
    /**
     * Wrap around a function to log enter and exit of a function
     *
     * @example
     * const logger = new ConsoleLogger('myNamespace.A');
     * class A {
     *   method() {
     *     logger.wrap(method, () => {
     *       // Do your stuff
     *     });
     *   }
     * }
     *
     * @param {Function} fn
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @param {Function} callback
     */
    wrap<T extends Metadata>(fn: Function, metadata?: T | Function, metadataStyles?: MetadataStyles<T> | Function, callback?: Function): void;
}
//# sourceMappingURL=index.d.ts.map