'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/esm/extends');
var Level = require('nightingale-levels');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var Level__default = /*#__PURE__*/_interopDefaultLegacy(Level);

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


var Logger = /*#__PURE__*/function () {
  /**
   * Create a new Logger
   *
   * @param {string} key
   * @param {string} [displayName]
   */
  function Logger(key, displayName) {
    this.key = key;
    this.displayName = displayName;

    if (key.includes('.')) {
      throw new Error(`nightingale: \`.\` in key is no longer supported, use \`:\` instead (key: ${key})`);
    }
  }
  /** @private */


  var _proto = Logger.prototype;

  _proto.getHandlersAndProcessors = function getHandlersAndProcessors(recordLevel) {
    return getConfigForLoggerRecord(this.key, recordLevel);
  }
  /** @private */
  ;

  _proto.getConfig = function getConfig() {
    return global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(this.key);
  }
  /**
   * Create a child logger
   */
  ;

  _proto.child = function child(childSuffixKey, childDisplayName) {
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
      if (record.level > Level__default.ERROR) {
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
      level = Level__default.INFO;
    }

    var context = metadata === null || metadata === void 0 ? void 0 : metadata.context;

    if (metadata) {
      delete metadata.context;
    }

    var record = _extends__default({
      level,
      key: this.key,
      displayName: this.displayName,
      datetime: new Date(),
      message,
      context: context || this.contextObject,
      metadata,
      extra: {}
    }, options);

    this.addRecord(record);
  }
  /**
   * Log a trace message
   */
  ;

  _proto.trace = function trace(message, metadata, metadataStyles) {
    this.log(message, metadata, Level__default.TRACE, {
      metadataStyles
    });
  }
  /**
   * Log a debug message
   */
  ;

  _proto.debug = function debug(message, metadata, metadataStyles) {
    this.log(message, metadata, Level__default.DEBUG, {
      metadataStyles
    });
  }
  /**
   * Notice an info message
   */
  ;

  _proto.notice = function notice(message, metadata, metadataStyles) {
    this.log(message, metadata, Level__default.NOTICE, {
      metadataStyles
    });
  }
  /**
   * Log an info message
   */
  ;

  _proto.info = function info(message, metadata, metadataStyles) {
    this.log(message, metadata, Level__default.INFO, {
      metadataStyles
    });
  }
  /**
   * Log a warn message
   */
  ;

  _proto.warn = function warn(message, metadata, metadataStyles) {
    this.log(message, metadata, Level__default.WARN, {
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
  ;

  _proto.error = function error(message, metadata, metadataStyles) {
    if (message instanceof Error) {
      var extendedMetadata = _extends__default({}, metadata, {
        error: message
      });

      message = `${extendedMetadata.error.name}: ${extendedMetadata.error.message}`;
      this.log(message, extendedMetadata, Level__default.ERROR, {
        metadataStyles
      });
    } else {
      this.log(message, metadata, Level__default.ERROR, {
        metadataStyles
      });
    }
  }
  /**
   * Log an critical message
   */
  ;

  _proto.critical = function critical(message, metadata, metadataStyles) {
    this.log(message, metadata, Level__default.CRITICAL, {
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
  ;

  _proto.fatal = function fatal(message, metadata, metadataStyles) {
    this.log(message, metadata, Level__default.FATAL, {
      metadataStyles
    });
  }
  /**
   * Log an alert message
   */
  ;

  _proto.alert = function alert(message, metadata, metadataStyles) {
    this.log(message, metadata, Level__default.ALERT, {
      metadataStyles
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
    this.log(message, metadata, Level__default.INFO, {
      metadataStyles,
      symbol: '✔',
      styles: ['green', 'bold']
    });
  }
  /**
   * Log an debug success message
   */
  ;

  _proto.debugSuccess = function debugSuccess(message, metadata, metadataStyles) {
    this.log(message, metadata, Level__default.DEBUG, {
      metadataStyles,
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
    this.log(message, metadata, Level__default.INFO, {
      metadataStyles,
      symbol: '✖',
      styles: ['red', 'bold']
    });
  }
  /**
   * Log an debug fail message
   */
  ;

  _proto.debugFail = function debugFail(message, metadata, metadataStyles) {
    this.log(message, metadata, Level__default.DEBUG, {
      metadataStyles,
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
      level = Level__default.DEBUG;
    }

    if (message) {
      this.log(message, metadata, level, {
        metadataStyles
      });
    }

    return Date.now();
  };

  _proto.infoTime = function infoTime(message, metadata, metadataStyles) {
    return this.time(message, metadata, metadataStyles, Level__default.INFO);
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
      level = Level__default.DEBUG;
    }

    var now = Date.now();
    var diffTime = now - startTime;
    var readableTime;

    if (diffTime < 1000) {
      readableTime = `${diffTime}ms`;
    } else {
      var seconds = diffTime > 1000 ? Math.floor(diffTime / 1000) : 0;
      readableTime = `${seconds ? `${seconds}s and ` : ''}${diffTime - seconds * 1000}ms`;
    }

    var extendedMetadata = _extends__default({}, metadata, {
      readableTime,
      timeMs: diffTime
    });

    this.log(message, extendedMetadata, level, _extends__default({}, options, {
      metadataStyles
    }));
  }
  /**
   * Like timeEnd, but with INFO level
   */
  ;

  _proto.infoTimeEnd = function infoTimeEnd(time, message, metadata, metadataStyles) {
    this.timeEnd(time, message, metadata, metadataStyles, Level__default.INFO);
  }
  /**
   * Like timeEnd, but with INFO level
   */
  ;

  _proto.infoSuccessTimeEnd = function infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
    this.timeEnd(time, message, metadata, metadataStyles, Level__default.INFO, {
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
  ;

  _proto.enter = function enter(fn, metadata, metadataStyles) {
    var extendedMetadata = _extends__default({}, metadata, {
      functionName: fn.name
    });

    this.log('enter', extendedMetadata, Level__default.TRACE, {
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
  ;

  _proto.exit = function exit(fn, metadata, metadataStyles) {
    var extendedMetadata = _extends__default({}, metadata, {
      functionName: fn.name
    });

    this.log('exit', extendedMetadata, Level__default.TRACE, {
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
  ;

  _proto.wrap = function wrap(fn, option1, option2, callback) {
    var metadata;
    var metadataStyles;

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
  };

  return Logger;
}();

exports.Level = Level__default;
exports.Logger = Logger;
exports.default = Logger;
//# sourceMappingURL=index-browser-dev.cjs.js.map
