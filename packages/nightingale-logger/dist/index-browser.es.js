import Level from 'nightingale-levels';
export { default as Level } from 'nightingale-levels';

/* eslint-disable max-lines */

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function () {
    return {
      handlers: [],
      processors: []
    };
  };
}

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = function (key, level) {
    var _global$__NIGHTINGALE = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key),
        handlers = _global$__NIGHTINGALE.handlers,
        processors = _global$__NIGHTINGALE.processors;

    return {
      handlers: handlers.filter(function (handler) {
        return level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key));
      }),
      processors: processors
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


var Logger =
/*#__PURE__*/
function () {
  /**
   * Create a new Logger
   *
   * @param {string} key
   * @param {string} [displayName]
   */
  function Logger(key, displayName) {
    this.key = key;
    this.displayName = displayName;
  }
  /** @private */


  var _proto = Logger.prototype;

  _proto.getHandlersAndProcessors = function getHandlersAndProcessors(recordLevel) {
    return getConfigForLoggerRecord(this.key, recordLevel);
  }
  /** @private */
  ;

  _proto.getConfig = function getConfig() {
    return global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(this.key, Level.ALL);
  }
  /**
   * Create a child logger
   */
  ;

  _proto.child = function child(childSuffixKey, childDisplayName) {
    return new Logger(this.key + ":" + childSuffixKey, childDisplayName);
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
  ;

  _proto.context = function context(_context) {
    var logger = new Logger(this.key);
    logger.setContext(_context);
    return logger;
  }
  /**
   * Get the context of this logger
   */
  ;

  _proto.getContextObject = function getContextObject() {
    return this.contextObject;
  }
  /**
   * Set the context of this logger
   *
   * @param {Object} context
   */
  ;

  _proto.setContext = function setContext(context) {
    this.contextObject = context;
  }
  /**
   * Extends existing context of this logger
   */
  ;

  _proto.extendsContext = function extendsContext(extendedContext) {
    Object.assign(this.contextObject, extendedContext);
  }
  /**
   * Handle a record
   *
   * Use this only if you know what you are doing.
   */
  ;

  _proto.addRecord = function addRecord(record) {
    var _this$getHandlersAndP = this.getHandlersAndProcessors(record.level),
        handlers = _this$getHandlersAndP.handlers,
        processors = _this$getHandlersAndP.processors;

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
      processors.forEach(function (process) {
        return process(record, record.context);
      });
    }

    handlers.some(function (handler) {
      return handler.handle(record) === false;
    });
  }
  /**
   * Log a message
   */
  ;

  _proto.log = function log(message, metadata, level, options) {
    if (level === void 0) {
      level = Level.INFO;
    }

    var context = metadata && metadata.context;

    if (metadata) {
      delete metadata.context;
    }

    var record = Object.assign({
      level: level,
      key: this.key,
      displayName: this.displayName,
      datetime: new Date(),
      message: message,
      context: context || this.contextObject,
      metadata: metadata,
      extra: {}
    }, options);
    this.addRecord(record);
  }
  /**
   * Log a trace message
   */
  ;

  _proto.trace = function trace(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.TRACE, {
      metadataStyles: metadataStyles
    });
  }
  /**
   * Log a debug message
   */
  ;

  _proto.debug = function debug(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.DEBUG, {
      metadataStyles: metadataStyles
    });
  }
  /**
   * Notice an info message
   */
  ;

  _proto.notice = function notice(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.NOTICE, {
      metadataStyles: metadataStyles
    });
  }
  /**
   * Log an info message
   */
  ;

  _proto.info = function info(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.INFO, {
      metadataStyles: metadataStyles
    });
  }
  /**
   * Log a warn message
   */
  ;

  _proto.warn = function warn(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.WARN, {
      metadataStyles: metadataStyles
    });
  }
  /**
   * Log an error message
   */
  ;

  _proto.error = function error(message, metadata, metadataStyles) {
    if (message instanceof Error) {
      var extendedMetadata = Object.assign({}, metadata, {
        error: message
      });
      message = extendedMetadata.error.name + ": " + extendedMetadata.error.message;
      this.log(message, extendedMetadata, Level.ERROR, {
        metadataStyles: metadataStyles
      });
    } else {
      this.log(message, metadata, Level.ERROR, {
        metadataStyles: metadataStyles
      });
    }
  }
  /**
   * Log an critical message
   */
  ;

  _proto.critical = function critical(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.CRITICAL, {
      metadataStyles: metadataStyles
    });
  }
  /**
   * Log a fatal message
   */
  ;

  _proto.fatal = function fatal(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.FATAL, {
      metadataStyles: metadataStyles
    });
  }
  /**
   * Log an alert message
   */
  ;

  _proto.alert = function alert(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.ALERT, {
      metadataStyles: metadataStyles
    });
  }
  /**
   * Log an inspected value
   */
  ;

  _proto.inspectValue = function inspectValue() {
    throw new Error('Not supported for the browser. Prefer `debugger;`');
  }
  /**
   * Log a debugged var
   */
  ;

  _proto.inspectVar = function inspectVar() {
    throw new Error('Not supported for the browser. Prefer `debugger;`');
  }
  /**
   * Alias for infoSuccess
   */
  ;

  _proto.success = function success(message, metadata, metadataStyles) {
    this.infoSuccess(message, metadata, metadataStyles);
  }
  /**
   * Log an info success message
   */
  ;

  _proto.infoSuccess = function infoSuccess(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.INFO, {
      metadataStyles: metadataStyles,
      symbol: '✔',
      styles: ['green', 'bold']
    });
  }
  /**
   * Log an debug success message
   */
  ;

  _proto.debugSuccess = function debugSuccess(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.DEBUG, {
      metadataStyles: metadataStyles,
      symbol: '✔',
      styles: ['green']
    });
  }
  /**
   * Alias for infoFail
   */
  ;

  _proto.fail = function fail(message, metadata, metadataStyles) {
    this.infoFail(message, metadata, metadataStyles);
  }
  /**
   * Log an info fail message
   */
  ;

  _proto.infoFail = function infoFail(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.INFO, {
      metadataStyles: metadataStyles,
      symbol: '✖',
      styles: ['red', 'bold']
    });
  }
  /**
   * Log an debug fail message
   */
  ;

  _proto.debugFail = function debugFail(message, metadata, metadataStyles) {
    this.log(message, metadata, Level.DEBUG, {
      metadataStyles: metadataStyles,
      symbol: '✖',
      styles: ['red']
    });
  }
  /**
   * @returns {number} time to pass to timeEnd
   */
  ;

  _proto.time = function time(message, metadata, metadataStyles, level) {
    if (level === void 0) {
      level = Level.DEBUG;
    }

    if (message) {
      this.log(message, metadata, level, {
        metadataStyles: metadataStyles
      });
    }

    return Date.now();
  };

  _proto.infoTime = function infoTime(message, metadata, metadataStyles) {
    return this.time(message, metadata, metadataStyles, Level.INFO);
  }
  /**
   * Finds difference between when this method
   * was called and when the respective time method
   * was called, then logs out the difference
   * and deletes the original record
   */
  ;

  _proto.timeEnd = function timeEnd(startTime, message, metadata, metadataStyles, level, options) {
    if (level === void 0) {
      level = Level.DEBUG;
    }

    var now = Date.now();
    var diffTime = now - startTime;
    var readableTime;

    if (diffTime < 1000) {
      readableTime = diffTime + "ms";
    } else {
      var seconds = diffTime > 1000 ? Math.floor(diffTime / 1000) : 0;
      readableTime = "" + (seconds ? seconds + "s and " : '') + (diffTime - seconds * 1000) + "ms";
    }

    var extendedMetadata = Object.assign({}, metadata, {
      readableTime: readableTime,
      timeMs: diffTime
    });
    this.log(message, extendedMetadata, level, Object.assign({}, options, {
      metadataStyles: metadataStyles
    }));
  }
  /**
   * Like timeEnd, but with INFO level
   */
  ;

  _proto.infoTimeEnd = function infoTimeEnd(time, message, metadata, metadataStyles) {
    this.timeEnd(time, message, metadata, metadataStyles, Level.INFO);
  }
  /**
   * Like timeEnd, but with INFO level
   */
  ;

  _proto.infoSuccessTimeEnd = function infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
    this.timeEnd(time, message, metadata, metadataStyles, Level.INFO, {
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
   */
  ;

  _proto.enter = function enter(fn, metadata, metadataStyles) {
    var extendedMetadata = Object.assign({}, metadata, {
      functionName: fn.name
    });
    this.log('enter', extendedMetadata, Level.TRACE, {
      metadataStyles: metadataStyles
    });
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
  ;

  _proto.exit = function exit(fn, metadata, metadataStyles) {
    var extendedMetadata = Object.assign({}, metadata, {
      functionName: fn.name
    });
    this.log('exit', extendedMetadata, Level.TRACE, {
      metadataStyles: metadataStyles
    });
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
  ;

  _proto.wrap = function wrap(fn, metadata, metadataStyles, callback) {
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
  };

  return Logger;
}();

export default Logger;
//# sourceMappingURL=index-browser.es.js.map
