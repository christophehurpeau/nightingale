'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = function () {
    return { handlers: [], processors: [] };
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

var Logger = function () {

  /**
   * Create a new Logger
   *
   * @param {string} key
   * @param {string} [displayName]
   */
  function Logger(key, displayName) {
    _classCallCheck(this, Logger);

    this.key = key;
    this.displayName = displayName;
  }

  /** @private */


  _createClass(Logger, [{
    key: 'getHandlersAndProcessors',
    value: function getHandlersAndProcessors(recordLevel) {
      return getConfigForLoggerRecord(this.key, recordLevel);
    }

    /** @private */

  }, {
    key: 'getConfig',
    value: function getConfig() {
      throw new Error('use getHandlersAndProcessors instead of getConfig');
    }

    /**
     * Create a child logger
     *
     * @param {string} childSuffixKey
     * @param {string} [childDisplayName]
     * @returns {Logger}
     */

  }, {
    key: 'child',
    value: function child(childSuffixKey, childDisplayName) {
      return new Logger(this.key + '.' + childSuffixKey, childDisplayName);
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

  }, {
    key: 'context',
    value: function context(_context) {
      var logger = new Logger(this.key);
      logger.setContext(_context);
      return logger;
    }

    /**
     * Set the context of this logger
     *
     * @param {Object} context
     */

  }, {
    key: 'setContext',
    value: function setContext(context) {
      this._context = context;
    }

    /**
     * Extends existing context of this logger
     *
     * @param {Object} extendedContext
     */

  }, {
    key: 'extendsContext',
    value: function extendsContext(extendedContext) {
      Object.assign(this._context, extendedContext);
    }

    /**
     * Handle a record
     *
     * Use this only if you know what you are doing.
     *
     * @param {Object} record
     */

  }, {
    key: 'addRecord',
    value: function addRecord(record) {
      var _getHandlersAndProces = this.getHandlersAndProcessors(record.level);

      var handlers = _getHandlersAndProces.handlers;
      var processors = _getHandlersAndProces.processors;


      if (handlers.length === 0) {
        if (record.level > _nightingaleLevels2.default.ERROR) {
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
     *
     * @param {string} message
     * @param {Object} metadata
     * @param {int} [level]
     * @param {Object} [options]
     * @return {Logger}
     */

  }, {
    key: 'log',
    value: function log(message, metadata) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _nightingaleLevels2.default.INFO;
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
      return this;
    }

    /**
     * Log a trace message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'trace',
    value: function trace(message, metadata, metadataStyles) {
      return this.log(message, metadata, _nightingaleLevels2.default.TRACE, { metadataStyles: metadataStyles });
    }

    /**
     * Log a debug message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'debug',
    value: function debug(message, metadata, metadataStyles) {
      return this.log(message, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles: metadataStyles });
    }

    /**
     * Log an info message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'info',
    value: function info(message, metadata, metadataStyles) {
      return this.log(message, metadata, _nightingaleLevels2.default.INFO, { metadataStyles: metadataStyles });
    }

    /**
     * Log a warn message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'warn',
    value: function warn(message, metadata, metadataStyles) {
      return this.log(message, metadata, _nightingaleLevels2.default.WARN, { metadataStyles: metadataStyles });
    }

    /**
     * Log an error message
     *
     * @param {string|Error} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'error',
    value: function error(message) {
      var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var metadataStyles = arguments[2];

      if (message instanceof Error) {
        metadata.error = message;
        message = metadata.error.name + ': ' + metadata.error.message;
      }
      return this.log(message, metadata, _nightingaleLevels2.default.ERROR, { metadataStyles: metadataStyles });
    }

    /**
     * Log an alert message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'alert',
    value: function alert(message, metadata, metadataStyles) {
      return this.log(message, metadata, _nightingaleLevels2.default.ALERT, { metadataStyles: metadataStyles });
    }

    /**
     * Log a fatal message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'fatal',
    value: function fatal(message, metadata, metadataStyles) {
      return this.log(message, metadata, _nightingaleLevels2.default.FATAL, { metadataStyles: metadataStyles });
    }

    /**
     * Log an inspected value
     *
     * @param {*} value
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'inspectValue',
    value: function inspectValue(value, metadata, metadataStyles) {
      // Note: inspect is a special function for node:
      // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
      value = _util2.default.inspect(value, { depth: 6 });
      return this.log(value, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles: metadataStyles, styles: ['gray'] });
    }

    /**
     * Log a debugged var
     *
     * @param {string} varName
     * @param {*} varValue
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'inspectVar',
    value: function inspectVar(varName, varValue, metadata, metadataStyles) {
      varValue = _util2.default.inspect(varValue, { depth: 6 });
      return this.log(varName + ' = ' + varValue, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles: metadataStyles, styles: ['cyan'] });
    }

    /**
     * Alias for infoSuccess
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'success',
    value: function success(message, metadata, metadataStyles) {
      return this.infoSuccess(message, metadata, metadataStyles);
    }

    /**
     * Log an info success message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'infoSuccess',
    value: function infoSuccess(message, metadata, metadataStyles) {
      return this.log(message, metadata, _nightingaleLevels2.default.INFO, {
        metadataStyles: metadataStyles,
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
     * @return {Logger}
     */

  }, {
    key: 'debugSuccess',
    value: function debugSuccess(message, metadata, metadataStyles) {
      return this.log(message, metadata, _nightingaleLevels2.default.DEBUG, {
        metadataStyles: metadataStyles,
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
     * @return {Logger}
     */

  }, {
    key: 'fail',
    value: function fail(message, metadata, metadataStyles) {
      return this.infoFail(message, metadata, metadataStyles);
    }

    /**
     * Log an info fail message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
     */

  }, {
    key: 'infoFail',
    value: function infoFail(message, metadata, metadataStyles) {
      return this.log(message, metadata, _nightingaleLevels2.default.INFO, {
        metadataStyles: metadataStyles,
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
     * @return {Logger}
     */

  }, {
    key: 'debugFail',
    value: function debugFail(message, metadata, metadataStyles) {
      return this.log(message, metadata, _nightingaleLevels2.default.DEBUG, {
        metadataStyles: metadataStyles,
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

  }, {
    key: 'time',
    value: function time(message, metadata, metadataStyles) {
      var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _nightingaleLevels2.default.DEBUG;

      if (message) {
        this.log(message, metadata, level, { metadataStyles: metadataStyles });
      }

      return Date.now();
    }
  }, {
    key: 'infoTime',
    value: function infoTime(message, metadata, metadataStyles) {
      return this.time(message, metadata, metadataStyles, _nightingaleLevels2.default.INFO);
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

  }, {
    key: 'timeEnd',
    value: function timeEnd(time, message) {
      var metadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var metadataStyles = arguments[3];
      var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _nightingaleLevels2.default.DEBUG;
      var options = arguments[5];

      var now = Date.now();

      var diffTime = now - time;

      if (diffTime < 1000) {
        metadata.readableTime = diffTime + 'ms';
      } else {
        var seconds = diffTime > 1000 && Math.floor(diffTime / 1000);
        var ms = diffTime - seconds * 1000;
        metadata.readableTime = '' + (seconds ? seconds + 's and ' : '') + ms + 'ms';
      }

      metadata.timeMs = diffTime;
      this.log(message, metadata, level, _extends({}, options, { metadataStyles: metadataStyles }));
    }

    /**
     * Like timeEnd, but with INFO level
     */

  }, {
    key: 'infoTimeEnd',
    value: function infoTimeEnd(time, message, metadata, metadataStyles) {
      return this.timeEnd(time, message, metadata, metadataStyles, _nightingaleLevels2.default.INFO);
    }

    /**
     * Like timeEnd, but with INFO level
     */

  }, {
    key: 'infoSuccessTimeEnd',
    value: function infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
      return this.timeEnd(time, message, metadata, metadataStyles, _nightingaleLevels2.default.INFO, {
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
     * @return {Logger}
     */

  }, {
    key: 'enter',
    value: function enter(fn) {
      var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var metadataStyles = arguments[2];

      metadata = _extends({
        functionName: fn.name
      }, metadata);
      return this.log('enter', metadata, _nightingaleLevels2.default.TRACE, { metadataStyles: metadataStyles });
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
     * @return {Logger}
     */

  }, {
    key: 'exit',
    value: function exit(fn, metadata, metadataStyles) {
      metadata = _extends({
        functionName: fn.name
      }, metadata);
      return this.log('exit', metadata, _nightingaleLevels2.default.TRACE, { metadataStyles: metadataStyles });
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

  }, {
    key: 'wrap',
    value: function wrap(fn, metadata, metadataStyles, callback) {
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
  }]);

  return Logger;
}();

exports.default = Logger;
//# sourceMappingURL=index.js.map