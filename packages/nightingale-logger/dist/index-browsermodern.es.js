import { Level } from 'nightingale-levels';
export { Level } from 'nightingale-levels';

/* eslint-disable max-lines */
const globalOrWindow = typeof global !== 'undefined' ? global : window;
if (!globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
  globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = () => ({
    handlers: [],
    processors: []
  });
}
if (!globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = (key, level) => {
    const {
      handlers,
      processors
    } = globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);
    return {
      handlers: handlers.filter(handler => level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key))),
      processors
    };
  };
}

/** @private */
function getConfigForLoggerRecord(key, recordLevel) {
  return globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD(key, recordLevel);
}
function isError(messageOrError) {
  return messageOrError instanceof Error;
}

/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */
class Logger {
  /**
   * Create a new Logger
   *
   * @param {string} key
   * @param {string} [displayName]
   */
  constructor(key, displayName) {
    this.key = key;
    this.displayName = displayName;
    if (process.env.NODE_ENV !== "production" && key.includes('.')) {
      throw new Error(`nightingale: \`.\` in key is no longer supported, use \`:\` instead (key: ${key})`);
    }
  }

  /** @private */
  getHandlersAndProcessors(recordLevel) {
    return getConfigForLoggerRecord(this.key, recordLevel);
  }

  /** @private */
  getConfig() {
    return globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(this.key);
  }

  /**
   * Create a child logger
   */
  child(childSuffixKey, childDisplayName) {
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
  context(context) {
    const logger = new Logger(this.key);
    logger.setContext(context);
    return logger;
  }

  /**
   * Get the context of this logger
   */
  getContextObject() {
    return this.contextObject;
  }

  /**
   * Set the context of this logger
   *
   * @param {Object} context
   */
  setContext(context) {
    this.contextObject = context;
  }

  /**
   * Extends existing context of this logger
   */
  extendsContext(extendedContext) {
    if (this.contextObject === undefined) {
      throw new Error('Cannot extends context that does not exists. Use setContext(context) first.');
    }
    Object.assign(this.contextObject, extendedContext);
  }

  /**
   * Handle a record
   *
   * Use this only if you know what you are doing.
   */
  addRecord(record) {
    const {
      handlers,
      processors
    } = this.getHandlersAndProcessors(record.level);
    if (handlers.length === 0) {
      if (record.level > Level.ERROR) {
        // eslint-disable-next-line no-console
        console.log('[nightingale] no logger for > error level.', {
          key: record.key,
          message: record.message
        });
      }
      return;
    }
    if (processors) {
      processors.forEach(process => {
        process(record, record.context);
      });
    }
    handlers.some(handler => handler.handle(record) === false);
  }

  /**
   * Log a message
   */
  log(messageOrError, metadata, level = Level.INFO, options) {
    const isMessageError = isError(messageOrError);
    const message = isMessageError ? `${messageOrError.name}: ${messageOrError.message}` : messageOrError;
    const extendedMetadata = isMessageError && !(metadata && Object.prototype.hasOwnProperty.call(metadata, 'error')) ? {
      ...metadata,
      error: messageOrError
    } : metadata;
    const context = extendedMetadata === null || extendedMetadata === void 0 ? void 0 : extendedMetadata.context;
    if (extendedMetadata) {
      delete extendedMetadata.context;
    }
    const record = {
      level,
      key: this.key,
      displayName: this.displayName,
      datetime: new Date(),
      message,
      context: context || this.contextObject,
      metadata: extendedMetadata,
      extra: {},
      ...options
    };
    this.addRecord(record);
  }

  /**
   * Log a trace message
   */
  trace(messageOrError, metadata, metadataStyles) {
    this.log(messageOrError, metadata, Level.TRACE, {
      metadataStyles
    });
  }

  /**
   * Log a debug message
   */
  debug(messageOrError, metadata, metadataStyles) {
    this.log(messageOrError, metadata, Level.DEBUG, {
      metadataStyles
    });
  }

  /**
   * Notice an info message
   */
  notice(messageOrError, metadata, metadataStyles) {
    this.log(messageOrError, metadata, Level.NOTICE, {
      metadataStyles
    });
  }

  /**
   * Log an info message
   */
  info(messageOrError, metadata, metadataStyles) {
    this.log(messageOrError, metadata, Level.INFO, {
      metadataStyles
    });
  }

  /**
   * Log a warn message
   */
  warn(messageOrError, metadata, metadataStyles) {
    this.log(messageOrError, metadata, Level.WARN, {
      metadataStyles
    });
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
  error(messageOrError, metadata, metadataStyles) {
    this.log(messageOrError, metadata, Level.ERROR, {
      metadataStyles
    });
  }

  /**
   * Log an critical message
   */
  critical(messageOrError, metadata, metadataStyles) {
    this.log(messageOrError, metadata, Level.CRITICAL, {
      metadataStyles
    });
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
  fatal(messageOrError, metadata, metadataStyles) {
    this.log(messageOrError, metadata, Level.FATAL, {
      metadataStyles
    });
  }

  /**
   * Log an alert message
   */
  alert(messageOrError, metadata, metadataStyles) {
    this.log(messageOrError, metadata, Level.ALERT, {
      metadataStyles
    });
  }

  /**
   * Log an inspected value
   */
  inspectValue() {
    throw new Error('Not supported for the browser. Prefer `debugger;`');
  }

  /**
   * Log a debugged var
   */
  inspectVar() {
    throw new Error('Not supported for the browser. Prefer `debugger;`');
  }

  /**
   * Alias for infoSuccess
   */
  success(message, metadata, metadataStyles) {
    this.infoSuccess(message, metadata, metadataStyles);
  }

  /**
   * Log an info success message
   */
  infoSuccess(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.INFO, {
      metadataStyles,
      symbol: '✔',
      styles: ['green', 'bold']
    });
  }

  /**
   * Log an debug success message
   */
  debugSuccess(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.DEBUG, {
      metadataStyles,
      symbol: '✔',
      styles: ['green']
    });
  }

  /**
   * Alias for infoFail
   */
  fail(messageOrError, metadata, metadataStyles) {
    this.infoFail(messageOrError, metadata, metadataStyles);
  }

  /**
   * Log an info fail message
   */
  infoFail(messageOrError, metadata, metadataStyles) {
    this.log(messageOrError, metadata, Level.INFO, {
      metadataStyles,
      symbol: '✖',
      styles: ['red', 'bold']
    });
  }

  /**
   * Log an debug fail message
   */
  debugFail(messageOrError, metadata, metadataStyles) {
    this.log(messageOrError, metadata, Level.DEBUG, {
      metadataStyles,
      symbol: '✖',
      styles: ['red']
    });
  }

  /**
   * @returns {number} time to pass to timeEnd
   */
  time(message, metadata, metadataStyles, level = Level.DEBUG) {
    if (message) {
      this.log(message, metadata, level, {
        metadataStyles
      });
    }
    return Date.now();
  }
  infoTime(message, metadata, metadataStyles) {
    return this.time(message, metadata, metadataStyles, Level.INFO);
  }

  /**
   * Finds difference between when this method
   * was called and when the respective time method
   * was called, then logs out the difference
   * and deletes the original record
   */
  timeEnd(startTime, message, metadata, metadataStyles, level = Level.DEBUG, options) {
    const now = Date.now();
    const diffTime = now - startTime;
    let readableTime;
    if (diffTime < 1000) {
      readableTime = `${diffTime}ms`;
    } else {
      const seconds = diffTime > 1000 ? Math.floor(diffTime / 1000) : 0;
      readableTime = `${seconds ? `${seconds}s and ` : ''}${diffTime - seconds * 1000}ms`;
    }
    const extendedMetadata = {
      ...metadata,
      readableTime,
      timeMs: diffTime
    };
    this.log(message, extendedMetadata, level, {
      ...options,
      metadataStyles
    });
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoTimeEnd(time, message, metadata, metadataStyles) {
    this.timeEnd(time, message, metadata, metadataStyles, Level.INFO);
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
    this.timeEnd(time, message, metadata, metadataStyles, Level.INFO, {
      symbol: '✔',
      styles: ['green', 'bold']
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
  enter(fn, metadata, metadataStyles) {
    const extendedMetadata = {
      ...metadata,
      functionName: fn.name
    };
    this.log('enter', extendedMetadata, Level.TRACE, {
      metadataStyles
    });
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
  exit(fn, metadata, metadataStyles) {
    const extendedMetadata = {
      ...metadata,
      functionName: fn.name
    };
    this.log('exit', extendedMetadata, Level.TRACE, {
      metadataStyles
    });
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

  wrap(fn, option1, option2, callback) {
    let metadata;
    let metadataStyles;
    if (typeof option1 === 'function') {
      callback = option1;
    } else {
      metadata = option1;
      if (typeof option2 === 'function') {
        callback = option2;
      } else {
        metadataStyles = option2;
      }
    }
    this.enter(fn, metadata, metadataStyles);
    callback();
    this.exit(fn);
  }
}

export { Logger };
//# sourceMappingURL=index-browsermodern.es.js.map
