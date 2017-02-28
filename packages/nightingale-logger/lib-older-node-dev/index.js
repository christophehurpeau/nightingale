'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable max-lines */

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecordType = _flowRuntime2.default.type('RecordType', _flowRuntime2.default.object(_flowRuntime2.default.property('level', _flowRuntime2.default.number()), _flowRuntime2.default.property('key', _flowRuntime2.default.string()), _flowRuntime2.default.property('displayName', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('datetime', _flowRuntime2.default.ref('Date')), _flowRuntime2.default.property('message', _flowRuntime2.default.string()), _flowRuntime2.default.property('context', _flowRuntime2.default.nullable(_flowRuntime2.default.object())), _flowRuntime2.default.property('metadata', _flowRuntime2.default.nullable(_flowRuntime2.default.object())), _flowRuntime2.default.property('extra', _flowRuntime2.default.nullable(_flowRuntime2.default.object()))));

var HandlerType = _flowRuntime2.default.type('HandlerType', _flowRuntime2.default.object(_flowRuntime2.default.property('minLevel', _flowRuntime2.default.number()), _flowRuntime2.default.property('isHandling', _flowRuntime2.default.nullable(_flowRuntime2.default.function(_flowRuntime2.default.return(_flowRuntime2.default.boolean())))), _flowRuntime2.default.property('handle', _flowRuntime2.default.nullable(_flowRuntime2.default.function(_flowRuntime2.default.param('record', RecordType), _flowRuntime2.default.return(_flowRuntime2.default.boolean()))))));

var ProcessorType = _flowRuntime2.default.type('ProcessorType', _flowRuntime2.default.function(_flowRuntime2.default.param('record', RecordType), _flowRuntime2.default.return(_flowRuntime2.default.void())));

var ConfigForLoggerType = _flowRuntime2.default.type('ConfigForLoggerType', _flowRuntime2.default.object(_flowRuntime2.default.property('handlers', _flowRuntime2.default.array(HandlerType)), _flowRuntime2.default.property('processors', _flowRuntime2.default.array(ProcessorType))));

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function () {
    var _returnType = _flowRuntime2.default.return(ConfigForLoggerType);

    return _returnType.assert({ handlers: [], processors: [] });
  };
}

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = function (key, level) {
    var _keyType = _flowRuntime2.default.string();

    var _levelType = _flowRuntime2.default.number();

    var _returnType2 = _flowRuntime2.default.return(ConfigForLoggerType);

    _flowRuntime2.default.param('key', _keyType).assert(key);

    _flowRuntime2.default.param('level', _levelType).assert(level);

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
  var _keyType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

  var _recordLevelType = _flowRuntime2.default.number();

  var _returnType3 = _flowRuntime2.default.return(ConfigForLoggerType);

  _flowRuntime2.default.param('key', _keyType2).assert(key);

  _flowRuntime2.default.param('recordLevel', _recordLevelType).assert(recordLevel);

  return _returnType3.assert(global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD(key, recordLevel));
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

    var _keyType3 = _flowRuntime2.default.string();

    var _displayNameType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

    _flowRuntime2.default.param('key', _keyType3).assert(key);

    _flowRuntime2.default.param('displayName', _displayNameType).assert(displayName);

    this.key = key;
    this.displayName = displayName;

    if (key.includes('.')) {
      this.warn('nightingale: `.` in key is deprecated, replace with `:`', { key: key, displayName: displayName });
      this.key = key.replace(/\./g, ':');
    }
  }

  /** @private */


  _createClass(Logger, [{
    key: 'getHandlersAndProcessors',
    value: function getHandlersAndProcessors(recordLevel) {
      var _recordLevelType2 = _flowRuntime2.default.number();

      var _returnType4 = _flowRuntime2.default.return(ConfigForLoggerType);

      _flowRuntime2.default.param('recordLevel', _recordLevelType2).assert(recordLevel);

      return _returnType4.assert(getConfigForLoggerRecord(this.key, recordLevel));
    }

    /** @private */

  }, {
    key: 'getConfig',
    value: function getConfig() {
      var _returnType5 = _flowRuntime2.default.return(ConfigForLoggerType);

      return _returnType5.assert(global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(this.key));
    }

    /**
     * Create a child logger
     */

  }, {
    key: 'child',
    value: function child(childSuffixKey, childDisplayName) {
      var _childSuffixKeyType = _flowRuntime2.default.string();

      var _childDisplayNameType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      var _returnType6 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Logger));

      _flowRuntime2.default.param('childSuffixKey', _childSuffixKeyType).assert(childSuffixKey);

      _flowRuntime2.default.param('childDisplayName', _childDisplayNameType).assert(childDisplayName);

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
      var _contextType = _flowRuntime2.default.object();

      var _returnType7 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Logger));

      _flowRuntime2.default.param('context', _contextType).assert(context);

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
      var _contextType2 = _flowRuntime2.default.object();

      _flowRuntime2.default.param('context', _contextType2).assert(context);

      this._context = context;
    }

    /**
     * Extends existing context of this logger
     */

  }, {
    key: 'extendsContext',
    value: function extendsContext(extendedContext) {
      var _extendedContextType = _flowRuntime2.default.object();

      _flowRuntime2.default.param('extendedContext', _extendedContextType).assert(extendedContext);

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
      var _recordType = _flowRuntime2.default.object();

      _flowRuntime2.default.param('record', _recordType).assert(record);

      var _getHandlersAndProces = this.getHandlersAndProcessors(record.level),
          handlers = _getHandlersAndProces.handlers,
          processors = _getHandlersAndProces.processors;

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
     */

  }, {
    key: 'log',
    value: function log(message, metadata) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _nightingaleLevels2.default.INFO;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

      var _messageType = _flowRuntime2.default.string();

      var _metadataType = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _levelType2 = _flowRuntime2.default.number();

      var _optionsType = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType).assert(metadata);

      _flowRuntime2.default.param('level', _levelType2).assert(level);

      _flowRuntime2.default.param('options', _optionsType).assert(options);

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
      var _messageType2 = _flowRuntime2.default.string();

      var _metadataType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType2).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType2).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.TRACE, { metadataStyles: metadataStyles });
    }

    /**
     * Log a debug message
     */

  }, {
    key: 'debug',
    value: function debug(message, metadata, metadataStyles) {
      var _messageType3 = _flowRuntime2.default.string();

      var _metadataType3 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType3).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType3).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType2).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles: metadataStyles });
    }

    /**
     * Notice an info message
     */

  }, {
    key: 'notice',
    value: function notice(message, metadata, metadataStyles) {
      var _messageType4 = _flowRuntime2.default.string();

      var _metadataType4 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType3 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType4).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType4).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType3).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.NOTICE, { metadataStyles: metadataStyles });
    }

    /**
     * Log an info message
     */

  }, {
    key: 'info',
    value: function info(message, metadata, metadataStyles) {
      var _messageType5 = _flowRuntime2.default.string();

      var _metadataType5 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType4 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType5).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType5).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType4).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.INFO, { metadataStyles: metadataStyles });
    }

    /**
     * Log a warn message
     */

  }, {
    key: 'warn',
    value: function warn(message, metadata, metadataStyles) {
      var _messageType6 = _flowRuntime2.default.string();

      var _metadataType6 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType5 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType6).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType6).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType5).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.WARN, { metadataStyles: metadataStyles });
    }

    /**
     * Log an error message
     */

  }, {
    key: 'error',
    value: function error(message) {
      var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var metadataStyles = arguments[2];

      var _messageType7 = _flowRuntime2.default.union(_flowRuntime2.default.string(), _flowRuntime2.default.ref('Error'));

      var _metadataType7 = _flowRuntime2.default.object();

      var _metadataStylesType6 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType7).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType7).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType6).assert(metadataStyles);

      if (message instanceof Error) {
        metadata.error = message;
        message = _messageType7.assert(metadata.error.name + ': ' + metadata.error.message);
      }
      this.log(message, metadata, _nightingaleLevels2.default.ERROR, { metadataStyles: metadataStyles });
    }

    /**
     * Log an critical message
     */

  }, {
    key: 'critical',
    value: function critical(message, metadata, metadataStyles) {
      var _messageType8 = _flowRuntime2.default.string();

      var _metadataType8 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType7 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType8).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType8).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType7).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.CRITICAL, { metadataStyles: metadataStyles });
    }

    /**
     * Log a fatal message
     */

  }, {
    key: 'fatal',
    value: function fatal(message, metadata, metadataStyles) {
      var _messageType9 = _flowRuntime2.default.string();

      var _metadataType9 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType8 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType9).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType9).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType8).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.FATAL, { metadataStyles: metadataStyles });
    }

    /**
     * Log an alert message
     */

  }, {
    key: 'alert',
    value: function alert(message, metadata, metadataStyles) {
      var _messageType10 = _flowRuntime2.default.string();

      var _metadataType10 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType9 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType10).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType10).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType9).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.ALERT, { metadataStyles: metadataStyles });
    }

    /**
     * Log an inspected value
     */

  }, {
    key: 'inspectValue',
    value: function inspectValue(value, metadata, metadataStyles) {
      var _valueType = _flowRuntime2.default.any();

      var _metadataType11 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType10 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('value', _valueType).assert(value);

      _flowRuntime2.default.param('metadata', _metadataType11).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType10).assert(metadataStyles);

      // Note: inspect is a special function for node:
      // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
      value = _valueType.assert(_util2.default.inspect(value, { depth: 6 }));
      this.log(value, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles: metadataStyles, styles: ['gray'] });
    }

    /**
     * Log a debugged var
     */

  }, {
    key: 'inspectVar',
    value: function inspectVar(varName, varValue, metadata, metadataStyles) {
      var _varNameType = _flowRuntime2.default.string();

      var _varValueType = _flowRuntime2.default.any();

      var _metadataType12 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType11 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('varName', _varNameType).assert(varName);

      _flowRuntime2.default.param('varValue', _varValueType).assert(varValue);

      _flowRuntime2.default.param('metadata', _metadataType12).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType11).assert(metadataStyles);

      varValue = _varValueType.assert(_util2.default.inspect(varValue, { depth: 6 }));
      this.log(varName + ' = ' + varValue, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles: metadataStyles, styles: ['cyan'] });
    }

    /**
     * Alias for infoSuccess
     */

  }, {
    key: 'success',
    value: function success(message, metadata, metadataStyles) {
      var _messageType11 = _flowRuntime2.default.string();

      var _metadataType13 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType12 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType11).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType13).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType12).assert(metadataStyles);

      this.infoSuccess(message, metadata, metadataStyles);
    }

    /**
     * Log an info success message
     */

  }, {
    key: 'infoSuccess',
    value: function infoSuccess(message, metadata, metadataStyles) {
      var _messageType12 = _flowRuntime2.default.string();

      var _metadataType14 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType13 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType12).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType14).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType13).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.INFO, {
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
      var _messageType13 = _flowRuntime2.default.string();

      var _metadataType15 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType14 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType13).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType15).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType14).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.DEBUG, {
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
      var _messageType14 = _flowRuntime2.default.string();

      var _metadataType16 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType15 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType14).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType16).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType15).assert(metadataStyles);

      this.infoFail(message, metadata, metadataStyles);
    }

    /**
     * Log an info fail message
     */

  }, {
    key: 'infoFail',
    value: function infoFail(message, metadata, metadataStyles) {
      var _messageType15 = _flowRuntime2.default.string();

      var _metadataType17 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType16 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType15).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType17).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType16).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.INFO, {
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
      var _messageType16 = _flowRuntime2.default.string();

      var _metadataType18 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType17 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('message', _messageType16).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType18).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType17).assert(metadataStyles);

      this.log(message, metadata, _nightingaleLevels2.default.DEBUG, {
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
      var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _nightingaleLevels2.default.DEBUG;

      var _messageType17 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      var _metadataType19 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType18 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _levelType3 = _flowRuntime2.default.number();

      var _returnType8 = _flowRuntime2.default.return(_flowRuntime2.default.number());

      _flowRuntime2.default.param('message', _messageType17).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType19).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType18).assert(metadataStyles);

      _flowRuntime2.default.param('level', _levelType3).assert(level);

      if (message) {
        this.log(message, metadata, level, { metadataStyles: metadataStyles });
      }

      return _returnType8.assert(Date.now());
    }
  }, {
    key: 'infoTime',
    value: function infoTime(message, metadata, metadataStyles) {
      var _messageType18 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      var _metadataType20 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType19 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _returnType9 = _flowRuntime2.default.return(_flowRuntime2.default.number());

      _flowRuntime2.default.param('message', _messageType18).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType20).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType19).assert(metadataStyles);

      return _returnType9.assert(this.time(message, metadata, metadataStyles, _nightingaleLevels2.default.INFO));
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
      var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _nightingaleLevels2.default.DEBUG;
      var options = arguments[5];

      var _startTimeType = _flowRuntime2.default.number();

      var _messageType19 = _flowRuntime2.default.string();

      var _metadataType21 = _flowRuntime2.default.object();

      var _metadataStylesType20 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _levelType4 = _flowRuntime2.default.number();

      var _optionsType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('startTime', _startTimeType).assert(startTime);

      _flowRuntime2.default.param('message', _messageType19).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType21).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType20).assert(metadataStyles);

      _flowRuntime2.default.param('level', _levelType4).assert(level);

      _flowRuntime2.default.param('options', _optionsType2).assert(options);

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
      var _timeType = _flowRuntime2.default.number();

      var _messageType20 = _flowRuntime2.default.string();

      var _metadataType22 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType21 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('time', _timeType).assert(time);

      _flowRuntime2.default.param('message', _messageType20).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType22).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType21).assert(metadataStyles);

      this.timeEnd(time, message, metadata, metadataStyles, _nightingaleLevels2.default.INFO);
    }

    /**
     * Like timeEnd, but with INFO level
     */

  }, {
    key: 'infoSuccessTimeEnd',
    value: function infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
      var _timeType2 = _flowRuntime2.default.number();

      var _messageType21 = _flowRuntime2.default.string();

      var _metadataType23 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType22 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('time', _timeType2).assert(time);

      _flowRuntime2.default.param('message', _messageType21).assert(message);

      _flowRuntime2.default.param('metadata', _metadataType23).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType22).assert(metadataStyles);

      this.timeEnd(time, message, metadata, metadataStyles, _nightingaleLevels2.default.INFO, {
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
      var _fnType = _flowRuntime2.default.function();

      var _metadataType24 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType23 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('fn', _fnType).assert(fn);

      _flowRuntime2.default.param('metadata', _metadataType24).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType23).assert(metadataStyles);

      metadata = _metadataType24.assert(Object.assign({
        functionName: fn.name
      }, metadata));
      this.log('enter', metadata, _nightingaleLevels2.default.TRACE, { metadataStyles: metadataStyles });
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
      var _fnType2 = _flowRuntime2.default.function();

      var _metadataType25 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      var _metadataStylesType24 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

      _flowRuntime2.default.param('fn', _fnType2).assert(fn);

      _flowRuntime2.default.param('metadata', _metadataType25).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType24).assert(metadataStyles);

      metadata = _metadataType25.assert(Object.assign({
        functionName: fn.name
      }, metadata));
      this.log('exit', metadata, _nightingaleLevels2.default.TRACE, { metadataStyles: metadataStyles });
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
      var _fnType3 = _flowRuntime2.default.function();

      var _metadataType26 = _flowRuntime2.default.union(_flowRuntime2.default.nullable(_flowRuntime2.default.object()), _flowRuntime2.default.function());

      var _metadataStylesType25 = _flowRuntime2.default.union(_flowRuntime2.default.nullable(_flowRuntime2.default.object()), _flowRuntime2.default.function());

      var _callbackType = _flowRuntime2.default.function();

      _flowRuntime2.default.param('fn', _fnType3).assert(fn);

      _flowRuntime2.default.param('metadata', _metadataType26).assert(metadata);

      _flowRuntime2.default.param('metadataStyles', _metadataStylesType25).assert(metadataStyles);

      _flowRuntime2.default.param('callback', _callbackType).assert(callback);

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
}();

exports.default = Logger;
//# sourceMappingURL=index.js.map