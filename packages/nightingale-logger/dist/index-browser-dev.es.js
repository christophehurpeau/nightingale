import levels from 'nightingale-levels';
import t from 'flow-runtime';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _dec, _dec2, _class, _descriptor, _descriptor2; /* eslint-disable max-lines */

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['keys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['defineProperty'](target, property, desc);
    desc = null;
  }

  return desc;
}
var RecordType = t.type('RecordType', t.object(t.property('level', t.number()), t.property('key', t.string()), t.property('displayName', t.nullable(t.string())), t.property('datetime', t.ref('Date')), t.property('message', t.string()), t.property('context', t.nullable(t.object())), t.property('metadata', t.nullable(t.object())), t.property('extra', t.nullable(t.object()))));
var HandlerType = t.type('HandlerType', t.object(t.property('minLevel', t.number()), t.property('isHandling', t.nullable(t.function(t.return(t.boolean())))), t.property('handle', t.nullable(t.function(t.param('record', RecordType), t.return(t.boolean()))))));
var ProcessorType = t.type('ProcessorType', t.function(t.param('record', RecordType), t.return(t.void())));
var ConfigForLoggerType = t.type('ConfigForLoggerType', t.object(t.property('handlers', t.array(HandlerType)), t.property('processors', t.array(ProcessorType))));


if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function () {
    var _returnType = t.return(ConfigForLoggerType);

    return _returnType.assert({ handlers: [], processors: [] });
  };
}

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = function (key, level) {
    var _keyType = t.string();

    var _levelType = t.number();

    var _returnType2 = t.return(ConfigForLoggerType);

    t.param('key', _keyType).assert(key);
    t.param('level', _levelType).assert(level);

    var _global$__NIGHTINGALE = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key),
        handlers = _global$__NIGHTINGALE.handlers,
        processors = _global$__NIGHTINGALE.processors;

    return _returnType2.assert({
      handlers: handlers.filter(function (handler) {
        return level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key));
      }),
      processors: processors
    });
  };
}

/** @private */
function getConfigForLoggerRecord(key, recordLevel) {
  var _keyType2 = t.nullable(t.string());

  var _recordLevelType = t.number();

  var _returnType3 = t.return(ConfigForLoggerType);

  t.param('key', _keyType2).assert(key);
  t.param('recordLevel', _recordLevelType).assert(recordLevel);

  return _returnType3.assert(global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD(key, recordLevel));
}

/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */
var Logger = (_dec = t.decorate(t.string()), _dec2 = t.decorate(t.nullable(t.string())), _class = function () {

  /**
   * Create a new Logger
   *
   * @param {string} key
   * @param {string} [displayName]
   */
  function Logger(key, displayName) {
    classCallCheck(this, Logger);

    _initDefineProp(this, 'key', _descriptor, this);

    _initDefineProp(this, 'displayName', _descriptor2, this);

    var _keyType3 = t.string();

    var _displayNameType = t.nullable(t.string());

    t.param('key', _keyType3).assert(key);
    t.param('displayName', _displayNameType).assert(displayName);

    this.key = key;
    this.displayName = displayName;

    if (key.includes('.')) {
      this.warn('nightingale: `.` in key is deprecated, replace with `:`', { key: key, displayName: displayName });
      this.key = key.replace(/\./g, ':');
    }
  }

  /** @private */


  createClass(Logger, [{
    key: 'getHandlersAndProcessors',
    value: function getHandlersAndProcessors(recordLevel) {
      var _recordLevelType2 = t.number();

      var _returnType4 = t.return(ConfigForLoggerType);

      t.param('recordLevel', _recordLevelType2).assert(recordLevel);

      return _returnType4.assert(getConfigForLoggerRecord(this.key, recordLevel));
    }

    /** @private */

  }, {
    key: 'getConfig',
    value: function getConfig() {
      var _returnType5 = t.return(ConfigForLoggerType);

      return _returnType5.assert(global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(this.key));
    }

    /**
     * Create a child logger
     */

  }, {
    key: 'child',
    value: function child(childSuffixKey, childDisplayName) {
      var _childSuffixKeyType = t.string();

      var _childDisplayNameType = t.nullable(t.string());

      var _returnType6 = t.return(t.ref(Logger));

      t.param('childSuffixKey', _childSuffixKeyType).assert(childSuffixKey);
      t.param('childDisplayName', _childDisplayNameType).assert(childDisplayName);

      return _returnType6.assert(new Logger(this.key + ':' + childSuffixKey, childDisplayName));
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

  }, {
    key: 'context',
    value: function (_context) {
      function context() {
        return _context.apply(this, arguments);
      }

      context.toString = function () {
        return _context.toString();
      };

      return context;
    }(function (context) {
      var _contextType = t.object();

      var _returnType7 = t.return(t.ref(Logger));

      t.param('context', _contextType).assert(context);

      var logger = new Logger(this.key);
      logger.setContext(context);
      return _returnType7.assert(logger);
    })

    /**
     * Set the context of this logger
     *
     * @param {Object} context
     */

  }, {
    key: 'setContext',
    value: function setContext(context) {
      var _contextType2 = t.object();

      t.param('context', _contextType2).assert(context);

      this._context = context;
    }

    /**
     * Extends existing context of this logger
     */

  }, {
    key: 'extendsContext',
    value: function extendsContext(extendedContext) {
      var _extendedContextType = t.object();

      t.param('extendedContext', _extendedContextType).assert(extendedContext);

      Object.assign(this._context, extendedContext);
    }

    /**
     * Handle a record
     *
     * Use this only if you know what you are doing.
     */

  }, {
    key: 'addRecord',
    value: function addRecord(record) {
      var _recordType = t.object();

      t.param('record', _recordType).assert(record);

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

  }, {
    key: 'log',
    value: function log(message, metadata) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : levels.INFO;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

      var _messageType = t.string();

      var _metadataType = t.nullable(t.object());

      var _levelType2 = t.number();

      var _optionsType = t.nullable(t.object());

      t.param('message', _messageType).assert(message);
      t.param('metadata', _metadataType).assert(metadata);
      t.param('level', _levelType2).assert(level);
      t.param('options', _optionsType).assert(options);

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
     */

  }, {
    key: 'trace',
    value: function trace(message, metadata, metadataStyles) {
      var _messageType2 = t.string();

      var _metadataType2 = t.nullable(t.object());

      var _metadataStylesType = t.nullable(t.object());

      t.param('message', _messageType2).assert(message);
      t.param('metadata', _metadataType2).assert(metadata);
      t.param('metadataStyles', _metadataStylesType).assert(metadataStyles);

      this.log(message, metadata, levels.TRACE, { metadataStyles: metadataStyles });
    }

    /**
     * Log a debug message
     */

  }, {
    key: 'debug',
    value: function debug(message, metadata, metadataStyles) {
      var _messageType3 = t.string();

      var _metadataType3 = t.nullable(t.object());

      var _metadataStylesType2 = t.nullable(t.object());

      t.param('message', _messageType3).assert(message);
      t.param('metadata', _metadataType3).assert(metadata);
      t.param('metadataStyles', _metadataStylesType2).assert(metadataStyles);

      this.log(message, metadata, levels.DEBUG, { metadataStyles: metadataStyles });
    }

    /**
     * Notice an info message
     */

  }, {
    key: 'notice',
    value: function notice(message, metadata, metadataStyles) {
      var _messageType4 = t.string();

      var _metadataType4 = t.nullable(t.object());

      var _metadataStylesType3 = t.nullable(t.object());

      t.param('message', _messageType4).assert(message);
      t.param('metadata', _metadataType4).assert(metadata);
      t.param('metadataStyles', _metadataStylesType3).assert(metadataStyles);

      this.log(message, metadata, levels.NOTICE, { metadataStyles: metadataStyles });
    }

    /**
     * Log an info message
     */

  }, {
    key: 'info',
    value: function info(message, metadata, metadataStyles) {
      var _messageType5 = t.string();

      var _metadataType5 = t.nullable(t.object());

      var _metadataStylesType4 = t.nullable(t.object());

      t.param('message', _messageType5).assert(message);
      t.param('metadata', _metadataType5).assert(metadata);
      t.param('metadataStyles', _metadataStylesType4).assert(metadataStyles);

      this.log(message, metadata, levels.INFO, { metadataStyles: metadataStyles });
    }

    /**
     * Log a warn message
     */

  }, {
    key: 'warn',
    value: function warn(message, metadata, metadataStyles) {
      var _messageType6 = t.string();

      var _metadataType6 = t.nullable(t.object());

      var _metadataStylesType5 = t.nullable(t.object());

      t.param('message', _messageType6).assert(message);
      t.param('metadata', _metadataType6).assert(metadata);
      t.param('metadataStyles', _metadataStylesType5).assert(metadataStyles);

      this.log(message, metadata, levels.WARN, { metadataStyles: metadataStyles });
    }

    /**
     * Log an error message
     */

  }, {
    key: 'error',
    value: function error(message) {
      var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var metadataStyles = arguments[2];

      var _messageType7 = t.union(t.string(), t.ref('Error'));

      var _metadataType7 = t.object();

      var _metadataStylesType6 = t.nullable(t.object());

      t.param('message', _messageType7).assert(message);
      t.param('metadata', _metadataType7).assert(metadata);
      t.param('metadataStyles', _metadataStylesType6).assert(metadataStyles);

      if (message instanceof Error) {
        metadata.error = message;
        message = _messageType7.assert(metadata.error.name + ': ' + metadata.error.message);
      }
      this.log(message, metadata, levels.ERROR, { metadataStyles: metadataStyles });
    }

    /**
     * Log an critical message
     */

  }, {
    key: 'critical',
    value: function critical(message, metadata, metadataStyles) {
      var _messageType8 = t.string();

      var _metadataType8 = t.nullable(t.object());

      var _metadataStylesType7 = t.nullable(t.object());

      t.param('message', _messageType8).assert(message);
      t.param('metadata', _metadataType8).assert(metadata);
      t.param('metadataStyles', _metadataStylesType7).assert(metadataStyles);

      this.log(message, metadata, levels.CRITICAL, { metadataStyles: metadataStyles });
    }

    /**
     * Log a fatal message
     */

  }, {
    key: 'fatal',
    value: function fatal(message, metadata, metadataStyles) {
      var _messageType9 = t.string();

      var _metadataType9 = t.nullable(t.object());

      var _metadataStylesType8 = t.nullable(t.object());

      t.param('message', _messageType9).assert(message);
      t.param('metadata', _metadataType9).assert(metadata);
      t.param('metadataStyles', _metadataStylesType8).assert(metadataStyles);

      this.log(message, metadata, levels.FATAL, { metadataStyles: metadataStyles });
    }

    /**
     * Log an alert message
     */

  }, {
    key: 'alert',
    value: function alert(message, metadata, metadataStyles) {
      var _messageType10 = t.string();

      var _metadataType10 = t.nullable(t.object());

      var _metadataStylesType9 = t.nullable(t.object());

      t.param('message', _messageType10).assert(message);
      t.param('metadata', _metadataType10).assert(metadata);
      t.param('metadataStyles', _metadataStylesType9).assert(metadataStyles);

      this.log(message, metadata, levels.ALERT, { metadataStyles: metadataStyles });
    }

    /**
     * Log an inspected value
     */

  }, {
    key: 'inspectValue',
    value: function inspectValue(value, metadata, metadataStyles) {
      var _valueType = t.any();

      var _metadataType11 = t.nullable(t.object());

      var _metadataStylesType10 = t.nullable(t.object());

      t.param('value', _valueType).assert(value);
      t.param('metadata', _metadataType11).assert(metadata);
      t.param('metadataStyles', _metadataStylesType10).assert(metadataStyles);

      throw new Error('Not supported for the browser. Prefer `debugger;`');
    }

    /**
     * Log a debugged var
     */

  }, {
    key: 'inspectVar',
    value: function inspectVar(varName, varValue, metadata, metadataStyles) {
      var _varNameType = t.string();

      var _varValueType = t.any();

      var _metadataType12 = t.nullable(t.object());

      var _metadataStylesType11 = t.nullable(t.object());

      t.param('varName', _varNameType).assert(varName);
      t.param('varValue', _varValueType).assert(varValue);
      t.param('metadata', _metadataType12).assert(metadata);
      t.param('metadataStyles', _metadataStylesType11).assert(metadataStyles);

      throw new Error('Not supported for the browser. Prefer `debugger;`');
    }

    /**
     * Alias for infoSuccess
     */

  }, {
    key: 'success',
    value: function success(message, metadata, metadataStyles) {
      var _messageType11 = t.string();

      var _metadataType13 = t.nullable(t.object());

      var _metadataStylesType12 = t.nullable(t.object());

      t.param('message', _messageType11).assert(message);
      t.param('metadata', _metadataType13).assert(metadata);
      t.param('metadataStyles', _metadataStylesType12).assert(metadataStyles);

      this.infoSuccess(message, metadata, metadataStyles);
    }

    /**
     * Log an info success message
     */

  }, {
    key: 'infoSuccess',
    value: function infoSuccess(message, metadata, metadataStyles) {
      var _messageType12 = t.string();

      var _metadataType14 = t.nullable(t.object());

      var _metadataStylesType13 = t.nullable(t.object());

      t.param('message', _messageType12).assert(message);
      t.param('metadata', _metadataType14).assert(metadata);
      t.param('metadataStyles', _metadataStylesType13).assert(metadataStyles);

      this.log(message, metadata, levels.INFO, {
        metadataStyles: metadataStyles,
        symbol: '✔',
        styles: ['green', 'bold']
      });
    }

    /**
     * Log an debug success message
     */

  }, {
    key: 'debugSuccess',
    value: function debugSuccess(message, metadata, metadataStyles) {
      var _messageType13 = t.string();

      var _metadataType15 = t.nullable(t.object());

      var _metadataStylesType14 = t.nullable(t.object());

      t.param('message', _messageType13).assert(message);
      t.param('metadata', _metadataType15).assert(metadata);
      t.param('metadataStyles', _metadataStylesType14).assert(metadataStyles);

      this.log(message, metadata, levels.DEBUG, {
        metadataStyles: metadataStyles,
        symbol: '✔',
        styles: ['green']
      });
    }

    /**
     * Alias for infoFail
     */

  }, {
    key: 'fail',
    value: function fail(message, metadata, metadataStyles) {
      var _messageType14 = t.string();

      var _metadataType16 = t.nullable(t.object());

      var _metadataStylesType15 = t.nullable(t.object());

      t.param('message', _messageType14).assert(message);
      t.param('metadata', _metadataType16).assert(metadata);
      t.param('metadataStyles', _metadataStylesType15).assert(metadataStyles);

      this.infoFail(message, metadata, metadataStyles);
    }

    /**
     * Log an info fail message
     */

  }, {
    key: 'infoFail',
    value: function infoFail(message, metadata, metadataStyles) {
      var _messageType15 = t.string();

      var _metadataType17 = t.nullable(t.object());

      var _metadataStylesType16 = t.nullable(t.object());

      t.param('message', _messageType15).assert(message);
      t.param('metadata', _metadataType17).assert(metadata);
      t.param('metadataStyles', _metadataStylesType16).assert(metadataStyles);

      this.log(message, metadata, levels.INFO, {
        metadataStyles: metadataStyles,
        symbol: '✖',
        styles: ['red', 'bold']
      });
    }

    /**
     * Log an debug fail message
     */

  }, {
    key: 'debugFail',
    value: function debugFail(message, metadata, metadataStyles) {
      var _messageType16 = t.string();

      var _metadataType18 = t.nullable(t.object());

      var _metadataStylesType17 = t.nullable(t.object());

      t.param('message', _messageType16).assert(message);
      t.param('metadata', _metadataType18).assert(metadata);
      t.param('metadataStyles', _metadataStylesType17).assert(metadataStyles);

      this.log(message, metadata, levels.DEBUG, {
        metadataStyles: metadataStyles,
        symbol: '✖',
        styles: ['red']
      });
    }

    /**
     * @returns {number} time to pass to timeEnd
     */

  }, {
    key: 'time',
    value: function time(message, metadata, metadataStyles) {
      var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : levels.DEBUG;

      var _messageType17 = t.nullable(t.string());

      var _metadataType19 = t.nullable(t.object());

      var _metadataStylesType18 = t.nullable(t.object());

      var _levelType3 = t.number();

      var _returnType8 = t.return(t.number());

      t.param('message', _messageType17).assert(message);
      t.param('metadata', _metadataType19).assert(metadata);
      t.param('metadataStyles', _metadataStylesType18).assert(metadataStyles);
      t.param('level', _levelType3).assert(level);

      if (message) {
        this.log(message, metadata, level, { metadataStyles: metadataStyles });
      }

      return _returnType8.assert(Date.now());
    }
  }, {
    key: 'infoTime',
    value: function infoTime(message, metadata, metadataStyles) {
      var _messageType18 = t.nullable(t.string());

      var _metadataType20 = t.nullable(t.object());

      var _metadataStylesType19 = t.nullable(t.object());

      var _returnType9 = t.return(t.number());

      t.param('message', _messageType18).assert(message);
      t.param('metadata', _metadataType20).assert(metadata);
      t.param('metadataStyles', _metadataStylesType19).assert(metadataStyles);

      return _returnType9.assert(this.time(message, metadata, metadataStyles, levels.INFO));
    }

    /**
     * Finds difference between when this method
     * was called and when the respective time method
     * was called, then logs out the difference
     * and deletes the original record
     */

  }, {
    key: 'timeEnd',
    value: function timeEnd(startTime, message) {
      var metadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var metadataStyles = arguments[3];
      var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : levels.DEBUG;
      var options = arguments[5];

      var _startTimeType = t.number();

      var _messageType19 = t.string();

      var _metadataType21 = t.object();

      var _metadataStylesType20 = t.nullable(t.object());

      var _levelType4 = t.number();

      var _optionsType2 = t.nullable(t.object());

      t.param('startTime', _startTimeType).assert(startTime);
      t.param('message', _messageType19).assert(message);
      t.param('metadata', _metadataType21).assert(metadata);
      t.param('metadataStyles', _metadataStylesType20).assert(metadataStyles);
      t.param('level', _levelType4).assert(level);
      t.param('options', _optionsType2).assert(options);

      var now = Date.now();

      var diffTime = now - startTime;

      if (diffTime < 1000) {
        metadata.readableTime = diffTime + 'ms';
      } else {
        var seconds = diffTime > 1000 && Math.floor(diffTime / 1000);

        metadata.readableTime = '' + (seconds ? seconds + 's and ' : '') + (diffTime - seconds * 1000) + 'ms';
      }

      metadata.timeMs = diffTime;
      this.log(message, metadata, level, Object.assign({}, options, { metadataStyles: metadataStyles }));
    }

    /**
     * Like timeEnd, but with INFO level
     */

  }, {
    key: 'infoTimeEnd',
    value: function infoTimeEnd(time, message, metadata, metadataStyles) {
      var _timeType = t.number();

      var _messageType20 = t.string();

      var _metadataType22 = t.nullable(t.object());

      var _metadataStylesType21 = t.nullable(t.object());

      t.param('time', _timeType).assert(time);
      t.param('message', _messageType20).assert(message);
      t.param('metadata', _metadataType22).assert(metadata);
      t.param('metadataStyles', _metadataStylesType21).assert(metadataStyles);

      this.timeEnd(time, message, metadata, metadataStyles, levels.INFO);
    }

    /**
     * Like timeEnd, but with INFO level
     */

  }, {
    key: 'infoSuccessTimeEnd',
    value: function infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
      var _timeType2 = t.number();

      var _messageType21 = t.string();

      var _metadataType23 = t.nullable(t.object());

      var _metadataStylesType22 = t.nullable(t.object());

      t.param('time', _timeType2).assert(time);
      t.param('message', _messageType21).assert(message);
      t.param('metadata', _metadataType23).assert(metadata);
      t.param('metadataStyles', _metadataStylesType22).assert(metadataStyles);

      this.timeEnd(time, message, metadata, metadataStyles, levels.INFO, {
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

  }, {
    key: 'enter',
    value: function enter(fn, metadata, metadataStyles) {
      var _fnType = t.function();

      var _metadataType24 = t.nullable(t.object());

      var _metadataStylesType23 = t.nullable(t.object());

      t.param('fn', _fnType).assert(fn);
      t.param('metadata', _metadataType24).assert(metadata);
      t.param('metadataStyles', _metadataStylesType23).assert(metadataStyles);

      metadata = _metadataType24.assert(Object.assign({
        functionName: fn.name
      }, metadata));
      this.log('enter', metadata, levels.TRACE, { metadataStyles: metadataStyles });
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

  }, {
    key: 'exit',
    value: function exit(fn, metadata, metadataStyles) {
      var _fnType2 = t.function();

      var _metadataType25 = t.nullable(t.object());

      var _metadataStylesType24 = t.nullable(t.object());

      t.param('fn', _fnType2).assert(fn);
      t.param('metadata', _metadataType25).assert(metadata);
      t.param('metadataStyles', _metadataStylesType24).assert(metadataStyles);

      metadata = _metadataType25.assert(Object.assign({
        functionName: fn.name
      }, metadata));
      this.log('exit', metadata, levels.TRACE, { metadataStyles: metadataStyles });
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
      var _fnType3 = t.function();

      var _metadataType26 = t.union(t.nullable(t.object()), t.function());

      var _metadataStylesType25 = t.union(t.nullable(t.object()), t.function());

      var _callbackType = t.function();

      t.param('fn', _fnType3).assert(fn);
      t.param('metadata', _metadataType26).assert(metadata);
      t.param('metadataStyles', _metadataStylesType25).assert(metadataStyles);
      t.param('callback', _callbackType).assert(callback);

      if (typeof metadata === 'function') {
        callback = _callbackType.assert(metadata);
        metadata = _metadataType26.assert(undefined);
      } else if (typeof metadataStyles === 'function') {
        callback = _callbackType.assert(metadataStyles);
        metadataStyles = _metadataStylesType25.assert(undefined);
      }

      this.enter(fn, metadata, metadataStyles);
      callback();
      this.exit(fn);
    }
  }]);
  return Logger;
}(), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'key', [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'displayName', [_dec2], {
  enumerable: true,
  initializer: null
}), _class);

export default Logger;
//# sourceMappingURL=index-browser-dev.es.js.map
