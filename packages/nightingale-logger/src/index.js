/* eslint-disable max-lines, flowtype/sort-keys */

import util from 'util';
import levels from 'nightingale-levels';

type Record = {
  level: number,
  key: string,
  displayName?: ?string,
  datetime: Date,
  message: string,
  context?: ?Object,
  metadata?: ?Object,
  extra?: ?Object,
};

type Handler = {
  minLevel: number,
  isHandling?: ?() => boolean,
  handle?: ?(record: Record) => boolean,
};

type Processor = (record: Record) => void;

type ConfigForLoggerType = {
  handlers: Array<Handler>,
  processors: Array<Processor>,
};

type Metadata = { [string]: any };
type MetadataStyles = { [string]: any };

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function(): ConfigForLoggerType {
    return { handlers: [], processors: [] };
  };
}

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = (
    key: string,
    level: number,
  ): ConfigForLoggerType => {
    const { handlers, processors } = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);

    return {
      handlers: handlers.filter(
        handler =>
          level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key)),
      ),
      processors,
    };
  };
}

/** @private */
function getConfigForLoggerRecord(key: ?string, recordLevel: number): ConfigForLoggerType {
  return global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD(key, recordLevel);
}

/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */
export default class Logger {
  key: string;
  displayName: ?string;
  _context: ?Object;

  /**
   * Create a new Logger
   *
   * @param {string} key
   * @param {string} [displayName]
   */
  constructor(key: string, displayName: ?string) {
    this.key = key;
    this.displayName = displayName;

    if (!PRODUCTION && key.includes('.')) {
      throw new Error(`nightingale: \`.\` in key is no longer supported (key: ${key})`);
    }
  }

  /** @private */
  getHandlersAndProcessors(recordLevel: number): ConfigForLoggerType {
    return getConfigForLoggerRecord(this.key, recordLevel);
  }

  /** @private */
  getConfig(): ConfigForLoggerType {
    return global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(this.key);
  }

  /**
   * Create a child logger
   */
  child(childSuffixKey: string, childDisplayName: ?string): Logger {
    return new Logger(`${this.key}:${childSuffixKey}`, childDisplayName);
  }

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
  context(context: Object): Logger {
    const logger = new Logger(this.key);
    logger.setContext(context);
    return logger;
  }

  /**
   * Set the context of this logger
   *
   * @param {Object} context
   */
  setContext(context: Object) {
    this._context = context;
  }

  /**
   * Extends existing context of this logger
   */
  extendsContext(extendedContext: Object) {
    Object.assign(this._context, extendedContext);
  }

  /**
   * Handle a record
   *
   * Use this only if you know what you are doing.
   */
  addRecord(record: Object) {
    const { handlers, processors } = this.getHandlersAndProcessors(record.level);

    if (handlers.length === 0) {
      if (record.level > levels.ERROR) {
        // eslint-disable-next-line no-console
        console.log('[nightingale] no logger for > error level.', {
          key: record.key,
          message: record.message,
        });
      }
      return;
    }

    if (processors) {
      processors.forEach(process => process(record, record.context));
    }

    handlers.some(handler => handler.handle(record) === false);
  }

  /**
   * Log a message
   */
  log(
    message: string,
    metadata: ?Metadata,
    level: number = levels.INFO,
    options: ?Object = undefined,
  ) {
    const context = metadata && metadata.context;
    if (metadata) {
      delete metadata.context;
    }

    let record = {
      level,
      key: this.key,
      displayName: this.displayName,
      datetime: new Date(),
      message,
      context: context || this._context,
      metadata,
      extra: {},
    };

    if (options) {
      record = Object.assign(options, record);
    }

    this.addRecord(record);
  }

  /**
   * Log a trace message
   */
  trace(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.TRACE, { metadataStyles });
  }

  /**
   * Log a debug message
   */
  debug(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.DEBUG, { metadataStyles });
  }

  /**
   * Notice an info message
   */
  notice(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.NOTICE, { metadataStyles });
  }

  /**
   * Log an info message
   */
  info(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.INFO, { metadataStyles });
  }

  /**
   * Log a warn message
   */
  warn(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.WARN, { metadataStyles });
  }

  /**
   * Log an error message
   */
  error(message: string | Error, metadata: Object = {}, metadataStyles: ?MetadataStyles) {
    if (message instanceof Error) {
      metadata.error = message;
      message = `${metadata.error.name}: ${metadata.error.message}`;
    }
    this.log(message, metadata, levels.ERROR, { metadataStyles });
  }

  /**
   * Log an critical message
   */
  critical(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.CRITICAL, { metadataStyles });
  }

  /**
   * Log a fatal message
   */
  fatal(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.FATAL, { metadataStyles });
  }

  /**
   * Log an alert message
   */
  alert(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.ALERT, { metadataStyles });
  }

  /**
   * Log an inspected value
   */
  inspectValue(value: any, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    if (BROWSER) {
      throw new Error('Not supported for the browser. Prefer `debugger;`');
    } else {
      // Note: inspect is a special function for node:
      // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
      value = util.inspect(value, { depth: 6 });
      this.log(value, metadata, levels.DEBUG, { metadataStyles, styles: ['gray'] });
    }
  }

  /**
   * Log a debugged var
   */
  inspectVar(varName: string, varValue: any, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    if (BROWSER) {
      throw new Error('Not supported for the browser. Prefer `debugger;`');
    } else {
      varValue = util.inspect(varValue, { depth: 6 });
      this.log(`${varName} = ${varValue}`, metadata, levels.DEBUG, {
        metadataStyles,
        styles: ['cyan'],
      });
    }
  }

  /**
   * Alias for infoSuccess
   */
  success(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.infoSuccess(message, metadata, metadataStyles);
  }

  /**
   * Log an info success message
   */
  infoSuccess(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.INFO, {
      metadataStyles,
      symbol: '✔',
      styles: ['green', 'bold'],
    });
  }

  /**
   * Log an debug success message
   */
  debugSuccess(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.DEBUG, {
      metadataStyles,
      symbol: '✔',
      styles: ['green'],
    });
  }

  /**
   * Alias for infoFail
   */
  fail(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.infoFail(message, metadata, metadataStyles);
  }

  /**
   * Log an info fail message
   */
  infoFail(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.INFO, {
      metadataStyles,
      symbol: '✖',
      styles: ['red', 'bold'],
    });
  }

  /**
   * Log an debug fail message
   */
  debugFail(message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.log(message, metadata, levels.DEBUG, {
      metadataStyles,
      symbol: '✖',
      styles: ['red'],
    });
  }

  /**
   * @returns {number} time to pass to timeEnd
   */
  time(
    message: ?string,
    metadata: ?Metadata,
    metadataStyles: ?MetadataStyles,
    level: number = levels.DEBUG,
  ): number {
    if (message) {
      this.log(message, metadata, level, { metadataStyles });
    }

    return Date.now();
  }

  infoTime(message: ?string, metadata: ?Metadata, metadataStyles: ?MetadataStyles): number {
    return this.time(message, metadata, metadataStyles, levels.INFO);
  }

  /**
   * Finds difference between when this method
   * was called and when the respective time method
   * was called, then logs out the difference
   * and deletes the original record
   */
  timeEnd(
    startTime: number,
    message: string,
    metadata: ?Metadata,
    metadataStyles: ?MetadataStyles,
    level: number = levels.DEBUG,
    options: ?Object,
  ) {
    if (!metadata) metadata = {};
    const now = Date.now();

    const diffTime = now - startTime;

    if (diffTime < 1000) {
      metadata.readableTime = `${diffTime}ms`;
    } else {
      const seconds = diffTime > 1000 ? Math.floor(diffTime / 1000) : 0;
      const ms = diffTime - seconds * 1000;
      metadata.readableTime = `${seconds ? `${seconds}s and ` : ''}${ms}ms`;
    }

    metadata.timeMs = diffTime;
    this.log(message, metadata, level, { ...options, metadataStyles });
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoTimeEnd(time: number, message: string, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    this.timeEnd(time, message, metadata, metadataStyles, levels.INFO);
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoSuccessTimeEnd(
    time: number,
    message: string,
    metadata: ?Metadata,
    metadataStyles: ?MetadataStyles,
  ) {
    this.timeEnd(time, message, metadata, metadataStyles, levels.INFO, {
      symbol: '✔',
      styles: ['green', 'bold'],
    });
  }

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
  enter(fn: Function, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    metadata = {
      functionName: fn.name,
      ...metadata,
    };
    this.log('enter', metadata, levels.TRACE, { metadataStyles });
  }

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
  exit(fn: Function, metadata: ?Metadata, metadataStyles: ?MetadataStyles) {
    metadata = {
      functionName: fn.name,
      ...metadata,
    };
    this.log('exit', metadata, levels.TRACE, { metadataStyles });
  }

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
  wrap(
    fn: Function,
    metadata: ?Metadata | Function,
    metadataStyles: ?MetadataStyles | Function,
    callback: Function,
  ) {
    if (typeof metadata === 'function') {
      callback = metadata;
      metadata = undefined;
    } else if (typeof metadataStyles === 'function') {
      callback = metadataStyles;
      metadataStyles = undefined;
    }

    this.enter(fn, metadata, metadataStyles);
    callback();
    this.exit(fn);
  }
}
