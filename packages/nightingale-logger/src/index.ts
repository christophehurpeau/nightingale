import * as util from "node:util";
import { Level } from "nightingale-levels";
import type {
  Handler,
  LogRecord,
  Metadata,
  MetadataStyles,
  Processor,
  Styles,
} from "nightingale-types";
import { POB_TARGET } from "pob-babel";

export { Level } from "nightingale-levels";

export interface Options<T extends Metadata> {
  symbol?: string;
  metadataStyles?: MetadataStyles<T>;
  styles?: Styles;
}

export interface ComputedConfigForKey {
  handlers: Handler[];
  processors: Processor[];
}

export interface ExtendedFunctionNameMetadata {
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
  // eslint-disable-next-line no-var
  var __NIGHTINGALE_CONFIG: Config[];
  // eslint-disable-next-line no-var
  var __NIGHTINGALE_LOGGER_MAP_CACHE: Map<string, ComputedConfigForKey>;
  // eslint-disable-next-line no-var
  var __NIGHTINGALE_CONFIG_DEFAULT: ComputedConfigForKey;
  // eslint-disable-next-line no-var
  var __NIGHTINGALE_GLOBAL_HANDLERS: unknown;
  // eslint-disable-next-line no-var
  var __NIGHTINGALE_GET_CONFIG_FOR_LOGGER: (
    key: string,
  ) => ComputedConfigForKey;
  // eslint-disable-next-line no-var
  var __NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD: (
    key: string,
    level: number,
  ) => ComputedConfigForKey;
}

const globalOrWindow: typeof globalThis =
  typeof globalThis !== "undefined" ? globalThis : globalThis;

if (!globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
  globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER =
    (): ComputedConfigForKey => ({
      handlers: [],
      processors: [],
    });
}

if (!globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = (
    key: string,
    level: Level,
  ): ComputedConfigForKey => {
    const { handlers, processors }: ComputedConfigForKey =
      globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);

    return {
      handlers: handlers.filter(
        (handler) =>
          level >= handler.minLevel &&
          (!handler.isHandling || handler.isHandling(level, key)),
      ),
      processors,
    };
  };
}

function getConfigForLoggerRecord(
  key: string,
  recordLevel: Level,
): ComputedConfigForKey {
  return globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD(
    key,
    recordLevel,
  );
}

function isError(messageOrError: Error | string): messageOrError is Error {
  return messageOrError instanceof Error;
}

/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */
export class Logger {
  private contextObject?: Record<string, unknown>;

  readonly key: string;

  readonly displayName?: string;

  /**
   * Create a new Logger
   *
   * @param {string} key
   * @param {string} [displayName]
   */
  constructor(key: string, displayName?: string) {
    this.key = key;
    this.displayName = displayName;

    if (process.env.NODE_ENV !== "production" && key.includes(".")) {
      throw new Error(
        `nightingale: \`.\` in key is no longer supported, use \`:\` instead (key: ${key})`,
      );
    }
  }

  /** @private */
  protected getHandlersAndProcessors(
    recordLevel: number,
  ): ComputedConfigForKey {
    return getConfigForLoggerRecord(this.key, recordLevel);
  }

  /** @private */
  getConfig(): Readonly<ComputedConfigForKey> {
    return globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(this.key);
  }

  /**
   * Create a child logger
   */
  child(childSuffixKey: string, childDisplayName?: string): Logger {
    return new Logger(`${this.key}:${childSuffixKey}`, childDisplayName);
  }

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
  context(context: Record<string, unknown>): Logger {
    const logger = new Logger(this.key);
    logger.setContext(context);
    return logger;
  }

  /**
   * Get the context of this logger
   */
  getContextObject(): Readonly<Record<string, unknown>> | undefined {
    return this.contextObject;
  }

  /**
   * Set the context of this logger
   *
   * @param {Object} context
   */
  setContext(context: Record<string, unknown>): void {
    this.contextObject = context;
  }

  /**
   * Extends existing context of this logger
   */
  extendsContext(extendedContext: Record<string, unknown>): void {
    if (this.contextObject === undefined) {
      throw new Error(
        "Cannot extends context that does not exists. Use setContext(context) first.",
      );
    }
    Object.assign(this.contextObject, extendedContext);
  }

  /**
   * Handle a record
   *
   * Use this only if you know what you are doing.
   */
  addRecord<T extends Metadata>(record: Readonly<LogRecord<T>>): void {
    const { handlers, processors } = this.getHandlersAndProcessors(
      record.level,
    );

    if (handlers.length === 0) {
      if (record.level > Level.ERROR) {
        // eslint-disable-next-line no-console
        console.log("[nightingale] no logger for > error level.", {
          key: record.key,
          message: record.message,
        });
      }
      return;
    }

    if (processors) {
      processors.forEach((process) => {
        process(record, record.context);
      });
    }

    handlers.some((handler) => handler.handle(record) === false);
  }

  /**
   * Log a message
   */
  log<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    level: Level = Level.INFO,
    options?: Options<T>,
  ): void {
    const isMessageError = isError(messageOrError);

    const message = isMessageError
      ? `${messageOrError.name}: ${messageOrError.message}`
      : messageOrError;

    const extendedMetadata =
      isMessageError && !(metadata && Object.hasOwn(metadata, "error"))
        ? { ...metadata, error: messageOrError }
        : metadata;

    const context = extendedMetadata?.context;
    if (extendedMetadata) {
      delete extendedMetadata.context;
    }

    const record: LogRecord<NonNullable<typeof extendedMetadata>> = {
      level,
      key: this.key,
      displayName: this.displayName,
      datetime: new Date(),
      message,
      context: context || this.contextObject,
      metadata: extendedMetadata as NonNullable<typeof extendedMetadata>,
      extra: {},
      ...options,
    };
    this.addRecord(record);
  }

  /**
   * Log a trace message
   */
  trace<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(messageOrError, metadata, Level.TRACE, { metadataStyles });
  }

  /**
   * Log a debug message
   */
  debug<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(messageOrError, metadata, Level.DEBUG, { metadataStyles });
  }

  /**
   * Notice an info message
   */
  notice<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(messageOrError, metadata, Level.NOTICE, { metadataStyles });
  }

  /**
   * Log an info message
   */
  info<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(messageOrError, metadata, Level.INFO, { metadataStyles });
  }

  /**
   * Log a warn message
   */
  warn<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(messageOrError, metadata, Level.WARN, { metadataStyles });
  }

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
  error<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(messageOrError, metadata, Level.ERROR, { metadataStyles });
  }

  /**
   * Log an critical message
   */
  critical<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(messageOrError, metadata, Level.CRITICAL, { metadataStyles });
  }

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
  fatal<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(messageOrError, metadata, Level.FATAL, { metadataStyles });
  }

  /**
   * Log an alert message
   */
  alert<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(messageOrError, metadata, Level.ALERT, { metadataStyles });
  }

  /**
   * Log an inspected value
   */
  inspectValue<T extends Metadata>(
    value: unknown,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    if (POB_TARGET === "browser") {
      throw new Error("Not supported for the browser. Prefer `debugger;`");
    } else {
      // Note: inspect is a special function for node:
      // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
      const inspectedValue = util.inspect(value, { depth: 6 });
      this.log(inspectedValue, metadata, Level.DEBUG, {
        metadataStyles,
        styles: ["gray"],
      });
    }
  }

  /**
   * Log a debugged var
   */
  inspectVar<T extends Metadata>(
    varName: string,
    varValue: unknown,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    if (POB_TARGET === "browser") {
      throw new Error("Not supported for the browser. Prefer `debugger;`");
    } else {
      const inspectedValue = util.inspect(varValue, { depth: 6 });
      this.log(`${varName} = ${inspectedValue}`, metadata, Level.DEBUG, {
        metadataStyles,
        styles: ["cyan"],
      });
    }
  }

  /**
   * Alias for infoSuccess
   */
  success<T extends Metadata>(
    message: string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.infoSuccess(message, metadata, metadataStyles);
  }

  /**
   * Log an info success message
   */
  infoSuccess<T extends Metadata>(
    message: string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(message, metadata, Level.INFO, {
      metadataStyles,
      symbol: "✔",
      styles: ["green", "bold"],
    });
  }

  /**
   * Log an debug success message
   */
  debugSuccess<T extends Metadata>(
    message: string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(message, metadata, Level.DEBUG, {
      metadataStyles,
      symbol: "✔",
      styles: ["green"],
    });
  }

  /**
   * Alias for infoFail
   */
  fail<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.infoFail(messageOrError, metadata, metadataStyles);
  }

  /**
   * Log an info fail message
   */
  infoFail<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(messageOrError, metadata, Level.INFO, {
      metadataStyles,
      symbol: "✖",
      styles: ["red", "bold"],
    });
  }

  /**
   * Log an debug fail message
   */
  debugFail<T extends Metadata>(
    messageOrError: Error | string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.log(messageOrError, metadata, Level.DEBUG, {
      metadataStyles,
      symbol: "✖",
      styles: ["red"],
    });
  }

  /**
   * @returns {number} time to pass to timeEnd
   */
  time<T extends Metadata>(
    message?: string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
    level: number = Level.DEBUG,
  ): number {
    if (message) {
      this.log(message, metadata, level, { metadataStyles });
    }

    return Date.now();
  }

  infoTime<T extends Metadata>(
    message?: string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): number {
    return this.time(message, metadata, metadataStyles, Level.INFO);
  }

  /**
   * Finds difference between when this method
   * was called and when the respective time method
   * was called, then logs out the difference
   * and deletes the original record
   */
  timeEnd<T extends Metadata>(
    startTime: number,
    message: string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
    level: number = Level.DEBUG,
    options?: Options<T>,
  ): void {
    const now = Date.now();

    const diffTime = now - startTime;
    let readableTime;

    if (diffTime < 1000) {
      readableTime = `${diffTime}ms`;
    } else {
      const seconds = diffTime > 1000 ? Math.floor(diffTime / 1000) : 0;
      const ms = diffTime - seconds * 1000;
      readableTime = `${seconds ? `${seconds}s and ` : ""}${ms}ms`;
    }

    const extendedMetadata = {
      ...metadata,
      readableTime,
      timeMs: diffTime,
    };

    this.log(message, extendedMetadata, level, { ...options, metadataStyles });
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoTimeEnd<T extends Metadata>(
    time: number,
    message: string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.timeEnd(time, message, metadata, metadataStyles, Level.INFO);
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoSuccessTimeEnd<T extends Metadata>(
    time: number,
    message: string,
    metadata?: T,
    metadataStyles?: MetadataStyles<T>,
  ): void {
    this.timeEnd(time, message, metadata, metadataStyles, Level.INFO, {
      symbol: "✔",
      styles: ["green", "bold"],
    });
  }

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
  enter<T extends Metadata, Fn extends (...args: unknown[]) => unknown>(
    fn: Fn,
    metadata?: T,
    metadataStyles?: MetadataStyles<ExtendedFunctionNameMetadata & T>,
  ): void {
    const extendedMetadata = {
      ...metadata,
      functionName: fn.name,
    };
    this.log("enter", extendedMetadata, Level.TRACE, { metadataStyles });
  }

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
  exit<T extends Metadata, Fn extends (...args: unknown[]) => unknown>(
    fn: Fn,
    metadata?: T,
    metadataStyles?: MetadataStyles<ExtendedFunctionNameMetadata & T>,
  ): void {
    const extendedMetadata = {
      ...metadata,
      functionName: fn.name,
    };
    this.log("exit", extendedMetadata, Level.TRACE, { metadataStyles });
  }

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
  wrap<Fn extends (...args: unknown[]) => unknown>(
    fn: Fn,
    callback: () => void,
  ): void;

  wrap<T extends Metadata, Fn extends (...args: unknown[]) => unknown>(
    fn: Fn,
    metadata: T,
    callback: () => void,
  ): void;

  wrap<T extends Metadata, Fn extends (...args: unknown[]) => unknown>(
    fn: Fn,
    metadata: T,
    metadataStyles: MetadataStyles<T>,
    callback: () => void,
  ): void;

  wrap<T extends Metadata, Fn extends (...args: unknown[]) => unknown>(
    fn: Fn,
    option1: T | (() => void),
    option2?: MetadataStyles<T> | (() => void),
    callback?: () => void,
  ): void {
    let metadata: T | undefined;
    let metadataStyles: MetadataStyles<T> | undefined;

    if (typeof option1 === "function") {
      callback = option1;
    } else {
      metadata = option1;

      if (typeof option2 === "function") {
        callback = option2;
      } else {
        metadataStyles = option2;
      }
    }

    this.enter(fn, metadata, metadataStyles);
    (callback as () => void)();
    this.exit(fn);
  }
}
