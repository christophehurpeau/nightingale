import levels from 'nightingale-levels';
import t from 'flow-runtime';

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
const RecordType = t.type('RecordType', t.object(t.property('level', t.number()), t.property('key', t.string()), t.property('displayName', t.nullable(t.string())), t.property('datetime', t.ref('Date')), t.property('message', t.string()), t.property('context', t.nullable(t.object())), t.property('metadata', t.nullable(t.object())), t.property('extra', t.nullable(t.object()))));
const HandlerType = t.type('HandlerType', t.object(t.property('minLevel', t.number()), t.property('isHandling', t.nullable(t.function(t.return(t.boolean())))), t.property('handle', t.nullable(t.function(t.param('record', RecordType), t.return(t.boolean()))))));
const ProcessorType = t.type('ProcessorType', t.function(t.param('record', RecordType), t.return(t.void())));
const ConfigForLoggerType = t.type('ConfigForLoggerType', t.object(t.property('handlers', t.array(HandlerType)), t.property('processors', t.array(ProcessorType))));


if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function () {
    const _returnType = t.return(ConfigForLoggerType);

    return _returnType.assert({ handlers: [], processors: [] });
  };
}

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = function (key, level) {
    let _keyType = t.string();

    let _levelType = t.number();

    const _returnType2 = t.return(ConfigForLoggerType);

    t.param('key', _keyType).assert(key);
    t.param('level', _levelType).assert(level);

    const { handlers, processors } = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);

    return _returnType2.assert({
      handlers: handlers.filter(function (handler) {
        return level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key));
      }),
      processors
    });
  };
}

/** @private */
function getConfigForLoggerRecord(key, recordLevel) {
  let _keyType2 = t.nullable(t.string());

  let _recordLevelType = t.number();

  const _returnType3 = t.return(ConfigForLoggerType);

  t.param('key', _keyType2).assert(key);
  t.param('recordLevel', _recordLevelType).assert(recordLevel);

  return _returnType3.assert(global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD(key, recordLevel));
}

/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */
let Logger = (_dec = t.decorate(t.string()), _dec2 = t.decorate(t.nullable(t.string())), _class = class Logger {

  /**
   * Create a new Logger
   *
   * @param {string} key
   * @param {string} [displayName]
   */
  constructor(key, displayName) {
    _initDefineProp(this, 'key', _descriptor, this);

    _initDefineProp(this, 'displayName', _descriptor2, this);

    let _keyType3 = t.string();

    let _displayNameType = t.nullable(t.string());

    t.param('key', _keyType3).assert(key);
    t.param('displayName', _displayNameType).assert(displayName);

    this.key = key;
    this.displayName = displayName;

    if (key.includes('.')) {
      this.warn('nightingale: `.` in key is deprecated, replace with `:`', { key, displayName });
      this.key = key.replace(/\./g, ':');
    }
  }

  /** @private */
  getHandlersAndProcessors(recordLevel) {
    let _recordLevelType2 = t.number();

    const _returnType4 = t.return(ConfigForLoggerType);

    t.param('recordLevel', _recordLevelType2).assert(recordLevel);

    return _returnType4.assert(getConfigForLoggerRecord(this.key, recordLevel));
  }

  /** @private */
  getConfig() {
    const _returnType5 = t.return(ConfigForLoggerType);

    return _returnType5.assert(global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(this.key));
  }

  /**
   * Create a child logger
   */
  child(childSuffixKey, childDisplayName) {
    let _childSuffixKeyType = t.string();

    let _childDisplayNameType = t.nullable(t.string());

    const _returnType6 = t.return(t.ref(Logger));

    t.param('childSuffixKey', _childSuffixKeyType).assert(childSuffixKey);
    t.param('childDisplayName', _childDisplayNameType).assert(childDisplayName);

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
    let _contextType = t.object();

    const _returnType7 = t.return(t.ref(Logger));

    t.param('context', _contextType).assert(context);

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
    let _contextType2 = t.object();

    t.param('context', _contextType2).assert(context);

    this._context = context;
  }

  /**
   * Extends existing context of this logger
   */
  extendsContext(extendedContext) {
    let _extendedContextType = t.object();

    t.param('extendedContext', _extendedContextType).assert(extendedContext);

    Object.assign(this._context, extendedContext);
  }

  /**
   * Handle a record
   *
   * Use this only if you know what you are doing.
   */
  addRecord(record) {
    let _recordType = t.object();

    t.param('record', _recordType).assert(record);

    let { handlers, processors } = this.getHandlersAndProcessors(record.level);

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
  log(message, metadata, level = levels.INFO, options = undefined) {
    let _messageType = t.string();

    let _metadataType = t.nullable(t.object());

    let _levelType2 = t.number();

    let _optionsType = t.nullable(t.object());

    t.param('message', _messageType).assert(message);
    t.param('metadata', _metadataType).assert(metadata);
    t.param('level', _levelType2).assert(level);
    t.param('options', _optionsType).assert(options);

    let context = metadata && metadata.context;
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
    let _messageType2 = t.string();

    let _metadataType2 = t.nullable(t.object());

    let _metadataStylesType = t.nullable(t.object());

    t.param('message', _messageType2).assert(message);
    t.param('metadata', _metadataType2).assert(metadata);
    t.param('metadataStyles', _metadataStylesType).assert(metadataStyles);

    this.log(message, metadata, levels.TRACE, { metadataStyles });
  }

  /**
   * Log a debug message
   */
  debug(message, metadata, metadataStyles) {
    let _messageType3 = t.string();

    let _metadataType3 = t.nullable(t.object());

    let _metadataStylesType2 = t.nullable(t.object());

    t.param('message', _messageType3).assert(message);
    t.param('metadata', _metadataType3).assert(metadata);
    t.param('metadataStyles', _metadataStylesType2).assert(metadataStyles);

    this.log(message, metadata, levels.DEBUG, { metadataStyles });
  }

  /**
   * Notice an info message
   */
  notice(message, metadata, metadataStyles) {
    let _messageType4 = t.string();

    let _metadataType4 = t.nullable(t.object());

    let _metadataStylesType3 = t.nullable(t.object());

    t.param('message', _messageType4).assert(message);
    t.param('metadata', _metadataType4).assert(metadata);
    t.param('metadataStyles', _metadataStylesType3).assert(metadataStyles);

    this.log(message, metadata, levels.NOTICE, { metadataStyles });
  }

  /**
   * Log an info message
   */
  info(message, metadata, metadataStyles) {
    let _messageType5 = t.string();

    let _metadataType5 = t.nullable(t.object());

    let _metadataStylesType4 = t.nullable(t.object());

    t.param('message', _messageType5).assert(message);
    t.param('metadata', _metadataType5).assert(metadata);
    t.param('metadataStyles', _metadataStylesType4).assert(metadataStyles);

    this.log(message, metadata, levels.INFO, { metadataStyles });
  }

  /**
   * Log a warn message
   */
  warn(message, metadata, metadataStyles) {
    let _messageType6 = t.string();

    let _metadataType6 = t.nullable(t.object());

    let _metadataStylesType5 = t.nullable(t.object());

    t.param('message', _messageType6).assert(message);
    t.param('metadata', _metadataType6).assert(metadata);
    t.param('metadataStyles', _metadataStylesType5).assert(metadataStyles);

    this.log(message, metadata, levels.WARN, { metadataStyles });
  }

  /**
   * Log an error message
   */
  error(message, metadata = {}, metadataStyles) {
    let _messageType7 = t.union(t.string(), t.ref('Error'));

    let _metadataType7 = t.object();

    let _metadataStylesType6 = t.nullable(t.object());

    t.param('message', _messageType7).assert(message);
    t.param('metadata', _metadataType7).assert(metadata);
    t.param('metadataStyles', _metadataStylesType6).assert(metadataStyles);

    if (message instanceof Error) {
      metadata.error = message;
      message = _messageType7.assert(`${metadata.error.name}: ${metadata.error.message}`);
    }
    this.log(message, metadata, levels.ERROR, { metadataStyles });
  }

  /**
   * Log an critical message
   */
  critical(message, metadata, metadataStyles) {
    let _messageType8 = t.string();

    let _metadataType8 = t.nullable(t.object());

    let _metadataStylesType7 = t.nullable(t.object());

    t.param('message', _messageType8).assert(message);
    t.param('metadata', _metadataType8).assert(metadata);
    t.param('metadataStyles', _metadataStylesType7).assert(metadataStyles);

    this.log(message, metadata, levels.CRITICAL, { metadataStyles });
  }

  /**
   * Log a fatal message
   */
  fatal(message, metadata, metadataStyles) {
    let _messageType9 = t.string();

    let _metadataType9 = t.nullable(t.object());

    let _metadataStylesType8 = t.nullable(t.object());

    t.param('message', _messageType9).assert(message);
    t.param('metadata', _metadataType9).assert(metadata);
    t.param('metadataStyles', _metadataStylesType8).assert(metadataStyles);

    this.log(message, metadata, levels.FATAL, { metadataStyles });
  }

  /**
   * Log an alert message
   */
  alert(message, metadata, metadataStyles) {
    let _messageType10 = t.string();

    let _metadataType10 = t.nullable(t.object());

    let _metadataStylesType9 = t.nullable(t.object());

    t.param('message', _messageType10).assert(message);
    t.param('metadata', _metadataType10).assert(metadata);
    t.param('metadataStyles', _metadataStylesType9).assert(metadataStyles);

    this.log(message, metadata, levels.ALERT, { metadataStyles });
  }

  /**
   * Log an inspected value
   */
  inspectValue(value, metadata, metadataStyles) {
    let _valueType = t.any();

    let _metadataType11 = t.nullable(t.object());

    let _metadataStylesType10 = t.nullable(t.object());

    t.param('value', _valueType).assert(value);
    t.param('metadata', _metadataType11).assert(metadata);
    t.param('metadataStyles', _metadataStylesType10).assert(metadataStyles);

    throw new Error('Not supported for the browser. Prefer `debugger;`');
  }

  /**
   * Log a debugged var
   */
  inspectVar(varName, varValue, metadata, metadataStyles) {
    let _varNameType = t.string();

    let _varValueType = t.any();

    let _metadataType12 = t.nullable(t.object());

    let _metadataStylesType11 = t.nullable(t.object());

    t.param('varName', _varNameType).assert(varName);
    t.param('varValue', _varValueType).assert(varValue);
    t.param('metadata', _metadataType12).assert(metadata);
    t.param('metadataStyles', _metadataStylesType11).assert(metadataStyles);

    throw new Error('Not supported for the browser. Prefer `debugger;`');
  }

  /**
   * Alias for infoSuccess
   */
  success(message, metadata, metadataStyles) {
    let _messageType11 = t.string();

    let _metadataType13 = t.nullable(t.object());

    let _metadataStylesType12 = t.nullable(t.object());

    t.param('message', _messageType11).assert(message);
    t.param('metadata', _metadataType13).assert(metadata);
    t.param('metadataStyles', _metadataStylesType12).assert(metadataStyles);

    this.infoSuccess(message, metadata, metadataStyles);
  }

  /**
   * Log an info success message
   */
  infoSuccess(message, metadata, metadataStyles) {
    let _messageType12 = t.string();

    let _metadataType14 = t.nullable(t.object());

    let _metadataStylesType13 = t.nullable(t.object());

    t.param('message', _messageType12).assert(message);
    t.param('metadata', _metadataType14).assert(metadata);
    t.param('metadataStyles', _metadataStylesType13).assert(metadataStyles);

    this.log(message, metadata, levels.INFO, {
      metadataStyles,
      symbol: '✔',
      styles: ['green', 'bold']
    });
  }

  /**
   * Log an debug success message
   */
  debugSuccess(message, metadata, metadataStyles) {
    let _messageType13 = t.string();

    let _metadataType15 = t.nullable(t.object());

    let _metadataStylesType14 = t.nullable(t.object());

    t.param('message', _messageType13).assert(message);
    t.param('metadata', _metadataType15).assert(metadata);
    t.param('metadataStyles', _metadataStylesType14).assert(metadataStyles);

    this.log(message, metadata, levels.DEBUG, {
      metadataStyles,
      symbol: '✔',
      styles: ['green']
    });
  }

  /**
   * Alias for infoFail
   */
  fail(message, metadata, metadataStyles) {
    let _messageType14 = t.string();

    let _metadataType16 = t.nullable(t.object());

    let _metadataStylesType15 = t.nullable(t.object());

    t.param('message', _messageType14).assert(message);
    t.param('metadata', _metadataType16).assert(metadata);
    t.param('metadataStyles', _metadataStylesType15).assert(metadataStyles);

    this.infoFail(message, metadata, metadataStyles);
  }

  /**
   * Log an info fail message
   */
  infoFail(message, metadata, metadataStyles) {
    let _messageType15 = t.string();

    let _metadataType17 = t.nullable(t.object());

    let _metadataStylesType16 = t.nullable(t.object());

    t.param('message', _messageType15).assert(message);
    t.param('metadata', _metadataType17).assert(metadata);
    t.param('metadataStyles', _metadataStylesType16).assert(metadataStyles);

    this.log(message, metadata, levels.INFO, {
      metadataStyles,
      symbol: '✖',
      styles: ['red', 'bold']
    });
  }

  /**
   * Log an debug fail message
   */
  debugFail(message, metadata, metadataStyles) {
    let _messageType16 = t.string();

    let _metadataType18 = t.nullable(t.object());

    let _metadataStylesType17 = t.nullable(t.object());

    t.param('message', _messageType16).assert(message);
    t.param('metadata', _metadataType18).assert(metadata);
    t.param('metadataStyles', _metadataStylesType17).assert(metadataStyles);

    this.log(message, metadata, levels.DEBUG, {
      metadataStyles,
      symbol: '✖',
      styles: ['red']
    });
  }

  /**
   * @returns {number} time to pass to timeEnd
   */
  time(message, metadata, metadataStyles, level = levels.DEBUG) {
    let _messageType17 = t.nullable(t.string());

    let _metadataType19 = t.nullable(t.object());

    let _metadataStylesType18 = t.nullable(t.object());

    let _levelType3 = t.number();

    const _returnType8 = t.return(t.number());

    t.param('message', _messageType17).assert(message);
    t.param('metadata', _metadataType19).assert(metadata);
    t.param('metadataStyles', _metadataStylesType18).assert(metadataStyles);
    t.param('level', _levelType3).assert(level);

    if (message) {
      this.log(message, metadata, level, { metadataStyles });
    }

    return _returnType8.assert(Date.now());
  }

  infoTime(message, metadata, metadataStyles) {
    let _messageType18 = t.nullable(t.string());

    let _metadataType20 = t.nullable(t.object());

    let _metadataStylesType19 = t.nullable(t.object());

    const _returnType9 = t.return(t.number());

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
  timeEnd(startTime, message, metadata = {}, metadataStyles, level = levels.DEBUG, options) {
    let _startTimeType = t.number();

    let _messageType19 = t.string();

    let _metadataType21 = t.object();

    let _metadataStylesType20 = t.nullable(t.object());

    let _levelType4 = t.number();

    let _optionsType2 = t.nullable(t.object());

    t.param('startTime', _startTimeType).assert(startTime);
    t.param('message', _messageType19).assert(message);
    t.param('metadata', _metadataType21).assert(metadata);
    t.param('metadataStyles', _metadataStylesType20).assert(metadataStyles);
    t.param('level', _levelType4).assert(level);
    t.param('options', _optionsType2).assert(options);

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
    let _timeType = t.number();

    let _messageType20 = t.string();

    let _metadataType22 = t.nullable(t.object());

    let _metadataStylesType21 = t.nullable(t.object());

    t.param('time', _timeType).assert(time);
    t.param('message', _messageType20).assert(message);
    t.param('metadata', _metadataType22).assert(metadata);
    t.param('metadataStyles', _metadataStylesType21).assert(metadataStyles);

    this.timeEnd(time, message, metadata, metadataStyles, levels.INFO);
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
    let _timeType2 = t.number();

    let _messageType21 = t.string();

    let _metadataType23 = t.nullable(t.object());

    let _metadataStylesType22 = t.nullable(t.object());

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
  enter(fn, metadata, metadataStyles) {
    let _fnType = t.function();

    let _metadataType24 = t.nullable(t.object());

    let _metadataStylesType23 = t.nullable(t.object());

    t.param('fn', _fnType).assert(fn);
    t.param('metadata', _metadataType24).assert(metadata);
    t.param('metadataStyles', _metadataStylesType23).assert(metadataStyles);

    metadata = _metadataType24.assert(Object.assign({
      functionName: fn.name
    }, metadata));
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
  exit(fn, metadata, metadataStyles) {
    let _fnType2 = t.function();

    let _metadataType25 = t.nullable(t.object());

    let _metadataStylesType24 = t.nullable(t.object());

    t.param('fn', _fnType2).assert(fn);
    t.param('metadata', _metadataType25).assert(metadata);
    t.param('metadataStyles', _metadataStylesType24).assert(metadataStyles);

    metadata = _metadataType25.assert(Object.assign({
      functionName: fn.name
    }, metadata));
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
  wrap(fn, metadata, metadataStyles, callback) {
    let _fnType3 = t.function();

    let _metadataType26 = t.union(t.nullable(t.object()), t.function());

    let _metadataStylesType25 = t.union(t.nullable(t.object()), t.function());

    let _callbackType = t.function();

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
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, 'key', [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'displayName', [_dec2], {
  enumerable: true,
  initializer: null
}), _class);

export default Logger;
//# sourceMappingURL=index-browsermodern-dev.es.js.map
