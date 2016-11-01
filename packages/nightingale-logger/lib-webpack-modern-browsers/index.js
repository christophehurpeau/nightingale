var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import util from 'util';
import levels from 'nightingale-levels';

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function () {
    return { handlers: [], processors: [] };
  };
}

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = function (key, level) {
    var _global$__NIGHTINGALE = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key),
        handlers = _global$__NIGHTINGALE.handlers,
        processors = _global$__NIGHTINGALE.processors;

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
export default class Logger {

  /**
   * Create a new Logger
   *
   * @param {string} key
   * @param {string} [displayName]
   */
  constructor(key, displayName) {
    if (key.includes('.')) {
      this.warn('nightingale: `.` in key is deprecated, replace with `:`', { key, displayName });
      key = key.replace(/\./g, ':');
    }
    this.key = key;
    this.displayName = displayName;
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
   *
   * @param {string} childSuffixKey
   * @param {string} [childDisplayName]
   * @returns {Logger}
   */
  child(childSuffixKey, childDisplayName) {
    return new Logger(`${ this.key }:${ childSuffixKey }`, childDisplayName);
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
   * @param {Object} context
   * @returns {Logger}
   */
  context(context) {
    var logger = new Logger(this.key);
    logger.setContext(context);
    return logger;
  }

  /**
   * Set the context of this logger
   *
   * @param {Object} context
   */
  setContext(context) {
    this._context = context;
  }

  /**
   * Extends existing context of this logger
   *
   * @param {Object} extendedContext
   */
  extendsContext(extendedContext) {
    Object.assign(this._context, extendedContext);
  }

  /**
   * Handle a record
   *
   * Use this only if you know what you are doing.
   *
   * @param {Object} record
   */
  addRecord(record) {
    var _getHandlersAndProces = this.getHandlersAndProcessors(record.level),
        handlers = _getHandlersAndProces.handlers,
        processors = _getHandlersAndProces.processors;

    if (handlers.length === 0) {
      if (record.level > levels.ERROR) {
        // eslint-disable-next-line no-console
        console.log('[nightingale] no logger for > error level.', {
          key: record.key,
          message: record.message
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
   *
   * @param {string} message
   * @param {Object} metadata
   * @param {int} [level]
   * @param {Object} [options]
   */
  log(message, metadata) {
    var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : levels.INFO;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    var context = metadata && metadata.context;
    if (metadata) {
      delete metadata.context;
    }

    var record = {
      level: level,
      key: this.key,
      displayName: this.displayName,
      datetime: new Date(),
      message: message,
      context: context || this._context,
      metadata: metadata,
      extra: {}
    };

    if (options) {
      record = Object.assign(options, record);
    }

    this.addRecord(record);
  }

  /**
   * Log a trace message
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  trace(message, metadata, metadataStyles) {
    return this.log(message, metadata, levels.TRACE, { metadataStyles });
  }

  /**
   * Log a debug message
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  debug(message, metadata, metadataStyles) {
    return this.log(message, metadata, levels.DEBUG, { metadataStyles });
  }

  /**
   * Log an info message
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  info(message, metadata, metadataStyles) {
    return this.log(message, metadata, levels.INFO, { metadataStyles });
  }

  /**
   * Log a warn message
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  warn(message, metadata, metadataStyles) {
    return this.log(message, metadata, levels.WARN, { metadataStyles });
  }

  /**
   * Log an error message
   *
   * @param {string|Error} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  error(message) {
    var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var metadataStyles = arguments[2];

    if (message instanceof Error) {
      metadata.error = message;
      message = `${ metadata.error.name }: ${ metadata.error.message }`;
    }
    return this.log(message, metadata, levels.ERROR, { metadataStyles });
  }

  /**
   * Log an alert message
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  alert(message, metadata, metadataStyles) {
    return this.log(message, metadata, levels.ALERT, { metadataStyles });
  }

  /**
   * Log a fatal message
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  fatal(message, metadata, metadataStyles) {
    return this.log(message, metadata, levels.FATAL, { metadataStyles });
  }

  /**
   * Log an inspected value
   *
   * @param {*} value
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  inspectValue(value, metadata, metadataStyles) {
    // Note: inspect is a special function for node:
    // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
    value = util.inspect(value, { depth: 6 });
    return this.log(value, metadata, levels.DEBUG, { metadataStyles, styles: ['gray'] });
  }

  /**
   * Log a debugged var
   *
   * @param {string} varName
   * @param {*} varValue
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  inspectVar(varName, varValue, metadata, metadataStyles) {
    varValue = util.inspect(varValue, { depth: 6 });
    return this.log(`${ varName } = ${ varValue }`, metadata, levels.DEBUG, { metadataStyles, styles: ['cyan'] });
  }

  /**
   * Alias for infoSuccess
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  success(message, metadata, metadataStyles) {
    return this.infoSuccess(message, metadata, metadataStyles);
  }

  /**
   * Log an info success message
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  infoSuccess(message, metadata, metadataStyles) {
    return this.log(message, metadata, levels.INFO, {
      metadataStyles,
      symbol: '✔',
      styles: ['green', 'bold']
    });
  }

  /**
   * Log an debug success message
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  debugSuccess(message, metadata, metadataStyles) {
    return this.log(message, metadata, levels.DEBUG, {
      metadataStyles,
      symbol: '✔',
      styles: ['green']
    });
  }

  /**
   * Alias for infoFail
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  fail(message, metadata, metadataStyles) {
    return this.infoFail(message, metadata, metadataStyles);
  }

  /**
   * Log an info fail message
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  infoFail(message, metadata, metadataStyles) {
    return this.log(message, metadata, levels.INFO, {
      metadataStyles,
      symbol: '✖',
      styles: ['red', 'bold']
    });
  }

  /**
   * Log an debug fail message
   *
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  debugFail(message, metadata, metadataStyles) {
    return this.log(message, metadata, levels.DEBUG, {
      metadataStyles,
      symbol: '✖',
      styles: ['red']
    });
  }

  /**
   * @param {string} [message]
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   * @param {number} [level = levels.DEBUG]
   * @returns {*} time to pass to timeEnd
   */
  time(message, metadata, metadataStyles) {
    var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : levels.DEBUG;

    if (message) {
      this.log(message, metadata, level, { metadataStyles });
    }

    return Date.now();
  }

  infoTime(message, metadata, metadataStyles) {
    return this.time(message, metadata, metadataStyles, levels.INFO);
  }

  /**
   * Finds difference between when this method
   * was called and when the respective time method
   * was called, then logs out the difference
   * and deletes the original record
   *
   * @param {number=} time return of previous call to time()
   * @param {string} message
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   * @param {number} [level = levels.DEBUG]
   */
  timeEnd(time, message) {
    var metadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var metadataStyles = arguments[3];
    var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : levels.DEBUG;
    var options = arguments[5];

    var now = Date.now();

    var diffTime = now - time;

    if (diffTime < 1000) {
      metadata.readableTime = `${ diffTime }ms`;
    } else {
      var seconds = diffTime > 1000 && Math.floor(diffTime / 1000);

      metadata.readableTime = `${ seconds ? `${ seconds }s and ` : '' }${ diffTime - seconds * 1000 }ms`;
    }

    metadata.timeMs = diffTime;
    this.log(message, metadata, level, _extends({}, options, { metadataStyles }));
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoTimeEnd(time, message, metadata, metadataStyles) {
    return this.timeEnd(time, message, metadata, metadataStyles, levels.INFO);
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
    return this.timeEnd(time, message, metadata, metadataStyles, levels.INFO, {
      symbol: '✔',
      styles: ['green', 'bold']
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
   * @param {Function} fn
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  enter(fn) {
    var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var metadataStyles = arguments[2];

    metadata = _extends({
      functionName: fn.name
    }, metadata);
    return this.log('enter', metadata, levels.TRACE, { metadataStyles });
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
   *
   *
   * @param {Function} fn
   * @param {Object} [metadata]
   * @param {Object} [metadataStyles]
   */
  exit(fn, metadata, metadataStyles) {
    metadata = _extends({
      functionName: fn.name
    }, metadata);
    return this.log('exit', metadata, levels.TRACE, { metadataStyles });
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
  wrap(fn, metadata, metadataStyles, callback) {
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
//# sourceMappingURL=index.js.map