'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _desc, _value, _class, _descriptor, _descriptor2; /* eslint-disable max-lines */

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function _initializerWarningHelper() {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

const RecordType = _flowRuntime2.default.type('RecordType', _flowRuntime2.default.object(_flowRuntime2.default.property('level', _flowRuntime2.default.number()), _flowRuntime2.default.property('key', _flowRuntime2.default.string()), _flowRuntime2.default.property('displayName', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.property('datetime', _flowRuntime2.default.ref('Date')), _flowRuntime2.default.property('message', _flowRuntime2.default.string()), _flowRuntime2.default.property('context', _flowRuntime2.default.nullable(_flowRuntime2.default.object())), _flowRuntime2.default.property('metadata', _flowRuntime2.default.nullable(_flowRuntime2.default.object())), _flowRuntime2.default.property('extra', _flowRuntime2.default.nullable(_flowRuntime2.default.object()))));

const HandlerType = _flowRuntime2.default.type('HandlerType', _flowRuntime2.default.object(_flowRuntime2.default.property('minLevel', _flowRuntime2.default.number()), _flowRuntime2.default.property('isHandling', _flowRuntime2.default.nullable(_flowRuntime2.default.function(_flowRuntime2.default.return(_flowRuntime2.default.boolean())))), _flowRuntime2.default.property('handle', _flowRuntime2.default.nullable(_flowRuntime2.default.function(_flowRuntime2.default.param('record', RecordType), _flowRuntime2.default.return(_flowRuntime2.default.boolean()))))));

const ProcessorType = _flowRuntime2.default.type('ProcessorType', _flowRuntime2.default.function(_flowRuntime2.default.param('record', RecordType), _flowRuntime2.default.return(_flowRuntime2.default.void())));

const ConfigForLoggerType = _flowRuntime2.default.type('ConfigForLoggerType', _flowRuntime2.default.object(_flowRuntime2.default.property('handlers', _flowRuntime2.default.array(HandlerType)), _flowRuntime2.default.property('processors', _flowRuntime2.default.array(ProcessorType))));

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function () {
    const _returnType = _flowRuntime2.default.return(ConfigForLoggerType);

    return _returnType.assert({ handlers: [], processors: [] });
  };
}

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = (key, level) => {
    let _keyType = _flowRuntime2.default.string();

    let _levelType = _flowRuntime2.default.number();

    const _returnType2 = _flowRuntime2.default.return(ConfigForLoggerType);

    _flowRuntime2.default.param('key', _keyType).assert(key);

    _flowRuntime2.default.param('level', _levelType).assert(level);

    const { handlers, processors } = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);

    return _returnType2.assert({
      handlers: handlers.filter(handler => level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key))),
      processors: processors
    });
  };
}

/** @private */
function getConfigForLoggerRecord(key, recordLevel) {
  let _keyType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

  let _recordLevelType = _flowRuntime2.default.number();

  const _returnType3 = _flowRuntime2.default.return(ConfigForLoggerType);

  _flowRuntime2.default.param('key', _keyType2).assert(key);

  _flowRuntime2.default.param('recordLevel', _recordLevelType).assert(recordLevel);

  return _returnType3.assert(global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD(key, recordLevel));
}

/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */
let Logger = (_dec = _flowRuntime2.default.decorate(_flowRuntime2.default.string()), _dec2 = _flowRuntime2.default.decorate(_flowRuntime2.default.nullable(_flowRuntime2.default.string())), (_class = class Logger {

  /**
   * Create a new Logger
   *
   * @param {string} key
   * @param {string} [displayName]
   */
  constructor(key, displayName) {
    _initDefineProp(this, 'key', _descriptor, this);

    _initDefineProp(this, 'displayName', _descriptor2, this);

    let _keyType3 = _flowRuntime2.default.string();

    let _displayNameType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

    _flowRuntime2.default.param('key', _keyType3).assert(key);

    _flowRuntime2.default.param('displayName', _displayNameType).assert(displayName);

    this.key = key;
    this.displayName = displayName;

    if (key.includes('.')) {
      this.warn('nightingale: `.` in key is deprecated, replace with `:`', { key, displayName });
      this.key = key.replace(/\./g, ':');
    }
  }

  /** @private */
  getHandlersAndProcessors(recordLevel) {
    let _recordLevelType2 = _flowRuntime2.default.number();

    const _returnType4 = _flowRuntime2.default.return(ConfigForLoggerType);

    _flowRuntime2.default.param('recordLevel', _recordLevelType2).assert(recordLevel);

    return _returnType4.assert(getConfigForLoggerRecord(this.key, recordLevel));
  }

  /** @private */
  getConfig() {
    const _returnType5 = _flowRuntime2.default.return(ConfigForLoggerType);

    return _returnType5.assert(global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(this.key));
  }

  /**
   * Create a child logger
   */
  child(childSuffixKey, childDisplayName) {
    let _childSuffixKeyType = _flowRuntime2.default.string();

    let _childDisplayNameType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

    const _returnType6 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Logger));

    _flowRuntime2.default.param('childSuffixKey', _childSuffixKeyType).assert(childSuffixKey);

    _flowRuntime2.default.param('childDisplayName', _childDisplayNameType).assert(childDisplayName);

    return _returnType6.assert(new Logger(`${this.key}:${childSuffixKey}`, childDisplayName));
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
  context(context) {
    let _contextType = _flowRuntime2.default.object();

    const _returnType7 = _flowRuntime2.default.return(_flowRuntime2.default.ref(Logger));

    _flowRuntime2.default.param('context', _contextType).assert(context);

    const logger = new Logger(this.key);
    logger.setContext(context);
    return _returnType7.assert(logger);
  }

  /**
   * Set the context of this logger
   *
   * @param {Object} context
   */
  setContext(context) {
    let _contextType2 = _flowRuntime2.default.object();

    _flowRuntime2.default.param('context', _contextType2).assert(context);

    this._context = context;
  }

  /**
   * Extends existing context of this logger
   */
  extendsContext(extendedContext) {
    let _extendedContextType = _flowRuntime2.default.object();

    _flowRuntime2.default.param('extendedContext', _extendedContextType).assert(extendedContext);

    Object.assign(this._context, extendedContext);
  }

  /**
   * Handle a record
   *
   * Use this only if you know what you are doing.
   */
  addRecord(record) {
    let _recordType = _flowRuntime2.default.object();

    _flowRuntime2.default.param('record', _recordType).assert(record);

    let { handlers, processors } = this.getHandlersAndProcessors(record.level);

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
      processors.forEach(process => process(record, record.context));
    }

    handlers.some(handler => handler.handle(record) === false);
  }

  /**
   * Log a message
   */
  log(message, metadata, level = _nightingaleLevels2.default.INFO, options = undefined) {
    let _messageType = _flowRuntime2.default.string();

    let _metadataType = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _levelType2 = _flowRuntime2.default.number();

    let _optionsType = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType).assert(metadata);

    _flowRuntime2.default.param('level', _levelType2).assert(level);

    _flowRuntime2.default.param('options', _optionsType).assert(options);

    let context = metadata && metadata.context;
    if (metadata) {
      delete metadata.context;
    }

    let record = {
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
  trace(message, metadata, metadataStyles) {
    let _messageType2 = _flowRuntime2.default.string();

    let _metadataType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType2).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType2).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.TRACE, { metadataStyles });
  }

  /**
   * Log a debug message
   */
  debug(message, metadata, metadataStyles) {
    let _messageType3 = _flowRuntime2.default.string();

    let _metadataType3 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType3).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType3).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType2).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles });
  }

  /**
   * Notice an info message
   */
  notice(message, metadata, metadataStyles) {
    let _messageType4 = _flowRuntime2.default.string();

    let _metadataType4 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType3 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType4).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType4).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType3).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.NOTICE, { metadataStyles });
  }

  /**
   * Log an info message
   */
  info(message, metadata, metadataStyles) {
    let _messageType5 = _flowRuntime2.default.string();

    let _metadataType5 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType4 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType5).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType5).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType4).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.INFO, { metadataStyles });
  }

  /**
   * Log a warn message
   */
  warn(message, metadata, metadataStyles) {
    let _messageType6 = _flowRuntime2.default.string();

    let _metadataType6 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType5 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType6).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType6).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType5).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.WARN, { metadataStyles });
  }

  /**
   * Log an error message
   */
  error(message, metadata = {}, metadataStyles) {
    let _messageType7 = _flowRuntime2.default.union(_flowRuntime2.default.string(), _flowRuntime2.default.ref('Error'));

    let _metadataType7 = _flowRuntime2.default.object();

    let _metadataStylesType6 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType7).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType7).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType6).assert(metadataStyles);

    if (message instanceof Error) {
      metadata.error = message;
      message = _messageType7.assert(`${metadata.error.name}: ${metadata.error.message}`);
    }
    this.log(message, metadata, _nightingaleLevels2.default.ERROR, { metadataStyles });
  }

  /**
   * Log an critical message
   */
  critical(message, metadata, metadataStyles) {
    let _messageType8 = _flowRuntime2.default.string();

    let _metadataType8 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType7 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType8).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType8).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType7).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.CRITICAL, { metadataStyles });
  }

  /**
   * Log a fatal message
   */
  fatal(message, metadata, metadataStyles) {
    let _messageType9 = _flowRuntime2.default.string();

    let _metadataType9 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType8 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType9).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType9).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType8).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.FATAL, { metadataStyles });
  }

  /**
   * Log an alert message
   */
  alert(message, metadata, metadataStyles) {
    let _messageType10 = _flowRuntime2.default.string();

    let _metadataType10 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType9 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType10).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType10).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType9).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.ALERT, { metadataStyles });
  }

  /**
   * Log an inspected value
   */
  inspectValue(value, metadata, metadataStyles) {
    let _valueType = _flowRuntime2.default.any();

    let _metadataType11 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType10 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('value', _valueType).assert(value);

    _flowRuntime2.default.param('metadata', _metadataType11).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType10).assert(metadataStyles);

    // Note: inspect is a special function for node:
    // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
    value = _valueType.assert(_util2.default.inspect(value, { depth: 6 }));
    this.log(value, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles, styles: ['gray'] });
  }

  /**
   * Log a debugged var
   */
  inspectVar(varName, varValue, metadata, metadataStyles) {
    let _varNameType = _flowRuntime2.default.string();

    let _varValueType = _flowRuntime2.default.any();

    let _metadataType12 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType11 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('varName', _varNameType).assert(varName);

    _flowRuntime2.default.param('varValue', _varValueType).assert(varValue);

    _flowRuntime2.default.param('metadata', _metadataType12).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType11).assert(metadataStyles);

    varValue = _varValueType.assert(_util2.default.inspect(varValue, { depth: 6 }));
    this.log(`${varName} = ${varValue}`, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles, styles: ['cyan'] });
  }

  /**
   * Alias for infoSuccess
   */
  success(message, metadata, metadataStyles) {
    let _messageType11 = _flowRuntime2.default.string();

    let _metadataType13 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType12 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType11).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType13).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType12).assert(metadataStyles);

    this.infoSuccess(message, metadata, metadataStyles);
  }

  /**
   * Log an info success message
   */
  infoSuccess(message, metadata, metadataStyles) {
    let _messageType12 = _flowRuntime2.default.string();

    let _metadataType14 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType13 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType12).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType14).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType13).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.INFO, {
      metadataStyles,
      symbol: '✔',
      styles: ['green', 'bold']
    });
  }

  /**
   * Log an debug success message
   */
  debugSuccess(message, metadata, metadataStyles) {
    let _messageType13 = _flowRuntime2.default.string();

    let _metadataType15 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType14 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType13).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType15).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType14).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.DEBUG, {
      metadataStyles,
      symbol: '✔',
      styles: ['green']
    });
  }

  /**
   * Alias for infoFail
   */
  fail(message, metadata, metadataStyles) {
    let _messageType14 = _flowRuntime2.default.string();

    let _metadataType16 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType15 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType14).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType16).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType15).assert(metadataStyles);

    this.infoFail(message, metadata, metadataStyles);
  }

  /**
   * Log an info fail message
   */
  infoFail(message, metadata, metadataStyles) {
    let _messageType15 = _flowRuntime2.default.string();

    let _metadataType17 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType16 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType15).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType17).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType16).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.INFO, {
      metadataStyles,
      symbol: '✖',
      styles: ['red', 'bold']
    });
  }

  /**
   * Log an debug fail message
   */
  debugFail(message, metadata, metadataStyles) {
    let _messageType16 = _flowRuntime2.default.string();

    let _metadataType18 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType17 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('message', _messageType16).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType18).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType17).assert(metadataStyles);

    this.log(message, metadata, _nightingaleLevels2.default.DEBUG, {
      metadataStyles,
      symbol: '✖',
      styles: ['red']
    });
  }

  /**
   * @returns {number} time to pass to timeEnd
   */
  time(message, metadata, metadataStyles, level = _nightingaleLevels2.default.DEBUG) {
    let _messageType17 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

    let _metadataType19 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType18 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _levelType3 = _flowRuntime2.default.number();

    const _returnType8 = _flowRuntime2.default.return(_flowRuntime2.default.number());

    _flowRuntime2.default.param('message', _messageType17).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType19).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType18).assert(metadataStyles);

    _flowRuntime2.default.param('level', _levelType3).assert(level);

    if (message) {
      this.log(message, metadata, level, { metadataStyles });
    }

    return _returnType8.assert(Date.now());
  }

  infoTime(message, metadata, metadataStyles) {
    let _messageType18 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

    let _metadataType20 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType19 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    const _returnType9 = _flowRuntime2.default.return(_flowRuntime2.default.number());

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
  timeEnd(startTime, message, metadata = {}, metadataStyles, level = _nightingaleLevels2.default.DEBUG, options) {
    let _startTimeType = _flowRuntime2.default.number();

    let _messageType19 = _flowRuntime2.default.string();

    let _metadataType21 = _flowRuntime2.default.object();

    let _metadataStylesType20 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _levelType4 = _flowRuntime2.default.number();

    let _optionsType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('startTime', _startTimeType).assert(startTime);

    _flowRuntime2.default.param('message', _messageType19).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType21).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType20).assert(metadataStyles);

    _flowRuntime2.default.param('level', _levelType4).assert(level);

    _flowRuntime2.default.param('options', _optionsType2).assert(options);

    const now = Date.now();

    const diffTime = now - startTime;

    if (diffTime < 1000) {
      metadata.readableTime = `${diffTime}ms`;
    } else {
      const seconds = diffTime > 1000 && Math.floor(diffTime / 1000);

      metadata.readableTime = `${seconds ? `${seconds}s and ` : ''}${diffTime - seconds * 1000}ms`;
    }

    metadata.timeMs = diffTime;
    this.log(message, metadata, level, Object.assign({}, options, { metadataStyles }));
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoTimeEnd(time, message, metadata, metadataStyles) {
    let _timeType = _flowRuntime2.default.number();

    let _messageType20 = _flowRuntime2.default.string();

    let _metadataType22 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType21 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('time', _timeType).assert(time);

    _flowRuntime2.default.param('message', _messageType20).assert(message);

    _flowRuntime2.default.param('metadata', _metadataType22).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType21).assert(metadataStyles);

    this.timeEnd(time, message, metadata, metadataStyles, _nightingaleLevels2.default.INFO);
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
    let _timeType2 = _flowRuntime2.default.number();

    let _messageType21 = _flowRuntime2.default.string();

    let _metadataType23 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType22 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

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
  enter(fn, metadata, metadataStyles) {
    let _fnType = _flowRuntime2.default.function();

    let _metadataType24 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType23 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('fn', _fnType).assert(fn);

    _flowRuntime2.default.param('metadata', _metadataType24).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType23).assert(metadataStyles);

    metadata = _metadataType24.assert(Object.assign({
      functionName: fn.name
    }, metadata));
    this.log('enter', metadata, _nightingaleLevels2.default.TRACE, { metadataStyles });
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
  exit(fn, metadata, metadataStyles) {
    let _fnType2 = _flowRuntime2.default.function();

    let _metadataType25 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    let _metadataStylesType24 = _flowRuntime2.default.nullable(_flowRuntime2.default.object());

    _flowRuntime2.default.param('fn', _fnType2).assert(fn);

    _flowRuntime2.default.param('metadata', _metadataType25).assert(metadata);

    _flowRuntime2.default.param('metadataStyles', _metadataStylesType24).assert(metadataStyles);

    metadata = _metadataType25.assert(Object.assign({
      functionName: fn.name
    }, metadata));
    this.log('exit', metadata, _nightingaleLevels2.default.TRACE, { metadataStyles });
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
    let _fnType3 = _flowRuntime2.default.function();

    let _metadataType26 = _flowRuntime2.default.union(_flowRuntime2.default.nullable(_flowRuntime2.default.object()), _flowRuntime2.default.function());

    let _metadataStylesType25 = _flowRuntime2.default.union(_flowRuntime2.default.nullable(_flowRuntime2.default.object()), _flowRuntime2.default.function());

    let _callbackType = _flowRuntime2.default.function();

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
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'key', [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'displayName', [_dec2], {
  enumerable: true,
  initializer: null
})), _class));
exports.default = Logger;
//# sourceMappingURL=index.js.map