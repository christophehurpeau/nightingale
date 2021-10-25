'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const util = require('util');
const nightingaleLevels = require('nightingale-levels');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n["default"] = e;
  return n;
}

const util__namespace = /*#__PURE__*/_interopNamespace(util);

/* eslint-disable max-lines */

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = () => ({
    handlers: [],
    processors: []
  });
}

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = (key, level) => {
    const {
      handlers,
      processors
    } = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);

    return {
      handlers: handlers.filter(handler => level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key))),
      processors
    };
  };
}
/** @private */


function getConfigForLoggerRecord(key, recordLevel) {
  return global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD(key, recordLevel);
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

    if (key.includes('.')) {
      throw new Error(`nightingale: \`.\` in key is no longer supported, use \`:\` instead (key: ${key})`);
    }
  }
  /** @private */


  getHandlersAndProcessors(recordLevel) {
    return getConfigForLoggerRecord(this.key, recordLevel);
  }
  /** @private */


  getConfig() {
    return global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(this.key);
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
      if (record.level > nightingaleLevels.Level.ERROR) {
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


  log(message, metadata, level = nightingaleLevels.Level.INFO, options) {
    const context = metadata === null || metadata === void 0 ? void 0 : metadata.context;

    if (metadata) {
      delete metadata.context;
    }

    const record = {
      level,
      key: this.key,
      displayName: this.displayName,
      datetime: new Date(),
      message,
      context: context || this.contextObject,
      metadata,
      extra: {},
      ...options
    };
    this.addRecord(record);
  }
  /**
   * Log a trace message
   */


  trace(message, metadata, metadataStyles) {
    this.log(message, metadata, nightingaleLevels.Level.TRACE, {
      metadataStyles
    });
  }
  /**
   * Log a debug message
   */


  debug(message, metadata, metadataStyles) {
    this.log(message, metadata, nightingaleLevels.Level.DEBUG, {
      metadataStyles
    });
  }
  /**
   * Notice an info message
   */


  notice(message, metadata, metadataStyles) {
    this.log(message, metadata, nightingaleLevels.Level.NOTICE, {
      metadataStyles
    });
  }
  /**
   * Log an info message
   */


  info(message, metadata, metadataStyles) {
    this.log(message, metadata, nightingaleLevels.Level.INFO, {
      metadataStyles
    });
  }
  /**
   * Log a warn message
   */


  warn(message, metadata, metadataStyles) {
    this.log(message, metadata, nightingaleLevels.Level.WARN, {
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


  error(message, metadata, metadataStyles) {
    if (message instanceof Error) {
      const extendedMetadata = { ...metadata,
        error: message
      };
      message = `${extendedMetadata.error.name}: ${extendedMetadata.error.message}`;
      this.log(message, extendedMetadata, nightingaleLevels.Level.ERROR, {
        metadataStyles
      });
    } else {
      this.log(message, metadata, nightingaleLevels.Level.ERROR, {
        metadataStyles
      });
    }
  }
  /**
   * Log an critical message
   */


  critical(message, metadata, metadataStyles) {
    this.log(message, metadata, nightingaleLevels.Level.CRITICAL, {
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


  fatal(message, metadata, metadataStyles) {
    this.log(message, metadata, nightingaleLevels.Level.FATAL, {
      metadataStyles
    });
  }
  /**
   * Log an alert message
   */


  alert(message, metadata, metadataStyles) {
    this.log(message, metadata, nightingaleLevels.Level.ALERT, {
      metadataStyles
    });
  }
  /**
   * Log an inspected value
   */


  inspectValue(value, metadata, metadataStyles) {
    {
      // Note: inspect is a special function for node:
      // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
      const inspectedValue = util__namespace.inspect(value, {
        depth: 6
      });
      this.log(inspectedValue, metadata, nightingaleLevels.Level.DEBUG, {
        metadataStyles,
        styles: ['gray']
      });
    }
  }
  /**
   * Log a debugged var
   */


  inspectVar(varName, varValue, metadata, metadataStyles) {
    {
      const inspectedValue = util__namespace.inspect(varValue, {
        depth: 6
      });
      this.log(`${varName} = ${inspectedValue}`, metadata, nightingaleLevels.Level.DEBUG, {
        metadataStyles,
        styles: ['cyan']
      });
    }
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
    this.log(message, metadata, nightingaleLevels.Level.INFO, {
      metadataStyles,
      symbol: '✔',
      styles: ['green', 'bold']
    });
  }
  /**
   * Log an debug success message
   */


  debugSuccess(message, metadata, metadataStyles) {
    this.log(message, metadata, nightingaleLevels.Level.DEBUG, {
      metadataStyles,
      symbol: '✔',
      styles: ['green']
    });
  }
  /**
   * Alias for infoFail
   */


  fail(message, metadata, metadataStyles) {
    this.infoFail(message, metadata, metadataStyles);
  }
  /**
   * Log an info fail message
   */


  infoFail(message, metadata, metadataStyles) {
    this.log(message, metadata, nightingaleLevels.Level.INFO, {
      metadataStyles,
      symbol: '✖',
      styles: ['red', 'bold']
    });
  }
  /**
   * Log an debug fail message
   */


  debugFail(message, metadata, metadataStyles) {
    this.log(message, metadata, nightingaleLevels.Level.DEBUG, {
      metadataStyles,
      symbol: '✖',
      styles: ['red']
    });
  }
  /**
   * @returns {number} time to pass to timeEnd
   */


  time(message, metadata, metadataStyles, level = nightingaleLevels.Level.DEBUG) {
    if (message) {
      this.log(message, metadata, level, {
        metadataStyles
      });
    }

    return Date.now();
  }

  infoTime(message, metadata, metadataStyles) {
    return this.time(message, metadata, metadataStyles, nightingaleLevels.Level.INFO);
  }
  /**
   * Finds difference between when this method
   * was called and when the respective time method
   * was called, then logs out the difference
   * and deletes the original record
   */


  timeEnd(startTime, message, metadata, metadataStyles, level = nightingaleLevels.Level.DEBUG, options) {
    const now = Date.now();
    const diffTime = now - startTime;
    let readableTime;

    if (diffTime < 1000) {
      readableTime = `${diffTime}ms`;
    } else {
      const seconds = diffTime > 1000 ? Math.floor(diffTime / 1000) : 0;
      readableTime = `${seconds ? `${seconds}s and ` : ''}${diffTime - seconds * 1000}ms`;
    }

    const extendedMetadata = { ...metadata,
      readableTime,
      timeMs: diffTime
    };
    this.log(message, extendedMetadata, level, { ...options,
      metadataStyles
    });
  }
  /**
   * Like timeEnd, but with INFO level
   */


  infoTimeEnd(time, message, metadata, metadataStyles) {
    this.timeEnd(time, message, metadata, metadataStyles, nightingaleLevels.Level.INFO);
  }
  /**
   * Like timeEnd, but with INFO level
   */


  infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
    this.timeEnd(time, message, metadata, metadataStyles, nightingaleLevels.Level.INFO, {
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
    const extendedMetadata = { ...metadata,
      functionName: fn.name
    };
    this.log('enter', extendedMetadata, nightingaleLevels.Level.TRACE, {
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
    const extendedMetadata = { ...metadata,
      functionName: fn.name
    };
    this.log('exit', extendedMetadata, nightingaleLevels.Level.TRACE, {
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

exports.Level = nightingaleLevels.Level;
exports.Logger = Logger;
exports["default"] = Logger;
//# sourceMappingURL=index-node12-dev.cjs.js.map
