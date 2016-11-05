var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import _t from 'tcomb-forked';

import levels from 'nightingale-levels';

var RecordType = _t.interface({
  level: _t.Number,
  key: _t.String,
  displayName: _t.maybe(_t.String),
  datetime: Date,
  message: _t.String,
  context: _t.maybe(_t.Object),
  metadata: _t.maybe(_t.Object),
  extra: _t.maybe(_t.Object)
}, 'RecordType');

var HandlerType = _t.interface({
  minLevel: _t.Number,
  isHandling: _t.maybe(_t.Function),
  handle: _t.maybe(_t.Function)
}, 'HandlerType');

var ProcessorType = _t.Function;

var ConfigForLoggerType = _t.interface({
  handlers: _t.list(HandlerType),
  processors: _t.list(ProcessorType)
}, 'ConfigForLoggerType');

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function () {
    return _assert(function () {
      return { handlers: [], processors: [] };
    }.apply(this, arguments), ConfigForLoggerType, 'return value');
  };
}

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = (key, level) => {
    _assert(key, _t.String, 'key');

    _assert(level, _t.Number, 'level');

    return _assert((() => {
      var _global$__NIGHTINGALE = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key),
          handlers = _global$__NIGHTINGALE.handlers,
          processors = _global$__NIGHTINGALE.processors;

      return {
        handlers: handlers.filter(handler => level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key))),
        processors
      };
    })(), ConfigForLoggerType, 'return value');
  };
}

/** @private */
function getConfigForLoggerRecord(key, recordLevel) {
  _assert(key, _t.maybe(_t.String), 'key');

  _assert(recordLevel, _t.Number, 'recordLevel');

  return _assert(function () {
    return global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD(key, recordLevel);
  }.apply(this, arguments), ConfigForLoggerType, 'return value');
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
    _assert(key, _t.String, 'key');

    _assert(displayName, _t.maybe(_t.String), 'displayName');

    if (key.includes('.')) {
      this.warn('nightingale: `.` in key is deprecated, replace with `:`', { key, displayName });
      key = key.replace(/\./g, ':');
    }
    this.key = key;
    this.displayName = displayName;
  }

  /** @private */
  getHandlersAndProcessors(recordLevel) {
    _assert(recordLevel, _t.Number, 'recordLevel');

    return _assert(function () {
      return getConfigForLoggerRecord(this.key, recordLevel);
    }.apply(this, arguments), ConfigForLoggerType, 'return value');
  }

  /** @private */
  getConfig() {
    return _assert(function () {
      return global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(this.key);
    }.apply(this, arguments), ConfigForLoggerType, 'return value');
  }

  /**
   * Create a child logger
   */
  child(childSuffixKey, childDisplayName) {
    _assert(childSuffixKey, _t.String, 'childSuffixKey');

    _assert(childDisplayName, _t.maybe(_t.String), 'childDisplayName');

    return _assert(function () {
      return new Logger(`${ this.key }:${ childSuffixKey }`, childDisplayName);
    }.apply(this, arguments), Logger, 'return value');
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
    _assert(context, _t.Object, 'context');

    return _assert(function () {
      var logger = new Logger(this.key);
      logger.setContext(context);
      return logger;
    }.apply(this, arguments), Logger, 'return value');
  }

  /**
   * Set the context of this logger
   *
   * @param {Object} context
   */
  setContext(context) {
    _assert(context, _t.Object, 'context');

    this._context = context;
  }

  /**
   * Extends existing context of this logger
   */
  extendsContext(extendedContext) {
    _assert(extendedContext, _t.Object, 'extendedContext');

    Object.assign(this._context, extendedContext);
  }

  /**
   * Handle a record
   *
   * Use this only if you know what you are doing.
   */
  addRecord(record) {
    _assert(record, _t.Object, 'record');

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
   */
  log(message, metadata) {
    var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : levels.INFO;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(level, _t.Number, 'level');

    _assert(options, _t.maybe(_t.Object), 'options');

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
  trace(message, metadata, metadataStyles) {
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    this.log(message, metadata, levels.TRACE, { metadataStyles });
  }

  /**
   * Log a debug message
   */
  debug(message, metadata, metadataStyles) {
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    this.log(message, metadata, levels.DEBUG, { metadataStyles });
  }

  /**
   * Log an info message
   */
  info(message, metadata, metadataStyles) {
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    this.log(message, metadata, levels.INFO, { metadataStyles });
  }

  /**
   * Log a warn message
   */
  warn(message, metadata, metadataStyles) {
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    this.log(message, metadata, levels.WARN, { metadataStyles });
  }

  /**
   * Log an error message
   */
  error(message) {
    var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var metadataStyles = arguments[2];

    _assert(message, _t.union([_t.String, Error]), 'message');

    _assert(metadata, _t.Object, 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    if (message instanceof Error) {
      metadata.error = message;
      message = `${ metadata.error.name }: ${ metadata.error.message }`;
    }
    this.log(message, metadata, levels.ERROR, { metadataStyles });
  }

  /**
   * Log an alert message
   */
  alert(message, metadata, metadataStyles) {
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    this.log(message, metadata, levels.ALERT, { metadataStyles });
  }

  /**
   * Log a fatal message
   */
  fatal(message, metadata, metadataStyles) {
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    this.log(message, metadata, levels.FATAL, { metadataStyles });
  }

  /**
   * Log an inspected value
   */
  inspectValue(value, metadata, metadataStyles) {
    _assert(value, _t.Any, 'value');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    throw new Error('Not supported for the browser. Prefer `debugger;`');
  }

  /**
   * Log a debugged var
   */
  inspectVar(varName, varValue, metadata, metadataStyles) {
    _assert(varName, _t.String, 'varName');

    _assert(varValue, _t.Any, 'varValue');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    throw new Error('Not supported for the browser. Prefer `debugger;`');
  }

  /**
   * Alias for infoSuccess
   */
  success(message, metadata, metadataStyles) {
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    this.infoSuccess(message, metadata, metadataStyles);
  }

  /**
   * Log an info success message
   */
  infoSuccess(message, metadata, metadataStyles) {
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

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
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

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
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    this.infoFail(message, metadata, metadataStyles);
  }

  /**
   * Log an info fail message
   */
  infoFail(message, metadata, metadataStyles) {
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

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
    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    this.log(message, metadata, levels.DEBUG, {
      metadataStyles,
      symbol: '✖',
      styles: ['red']
    });
  }

  /**
   * @returns {number} time to pass to timeEnd
   */
  time(message, metadata, metadataStyles) {
    var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : levels.DEBUG;

    _assert(message, _t.maybe(_t.String), 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    _assert(level, _t.Number, 'level');

    return _assert(function () {
      if (message) {
        this.log(message, metadata, level, { metadataStyles });
      }

      return Date.now();
    }.apply(this, arguments), _t.Number, 'return value');
  }

  infoTime(message, metadata, metadataStyles) {
    _assert(message, _t.maybe(_t.String), 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    return _assert(function () {
      return this.time(message, metadata, metadataStyles, levels.INFO);
    }.apply(this, arguments), _t.Number, 'return value');
  }

  /**
   * Finds difference between when this method
   * was called and when the respective time method
   * was called, then logs out the difference
   * and deletes the original record
   */
  timeEnd(startTime, message) {
    var metadata = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var metadataStyles = arguments[3];
    var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : levels.DEBUG;
    var options = arguments[5];

    _assert(startTime, _t.Number, 'startTime');

    _assert(message, _t.String, 'message');

    _assert(metadata, _t.Object, 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    _assert(level, _t.Number, 'level');

    _assert(options, _t.maybe(_t.Object), 'options');

    var now = Date.now();

    var diffTime = now - startTime;

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
    _assert(time, _t.Number, 'time');

    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    this.timeEnd(time, message, metadata, metadataStyles, levels.INFO);
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
    _assert(time, _t.Number, 'time');

    _assert(message, _t.String, 'message');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

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
    _assert(fn, _t.Function, 'fn');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    metadata = _extends({
      functionName: fn.name
    }, metadata);
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
    _assert(fn, _t.Function, 'fn');

    _assert(metadata, _t.maybe(_t.Object), 'metadata');

    _assert(metadataStyles, _t.maybe(_t.Object), 'metadataStyles');

    metadata = _extends({
      functionName: fn.name
    }, metadata);
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
    _assert(fn, _t.Function, 'fn');

    _assert(metadata, _t.union([_t.maybe(_t.Object), _t.Function]), 'metadata');

    _assert(metadataStyles, _t.union([_t.maybe(_t.Object), _t.Function]), 'metadataStyles');

    _assert(callback, _t.Function, 'callback');

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

function _assert(x, type, name) {
  function message() {
    return 'Invalid value ' + _t.stringify(x) + ' supplied to ' + name + ' (expected a ' + _t.getTypeName(type) + ')';
  }

  if (_t.isType(type)) {
    if (!type.is(x)) {
      type(x, [name + ': ' + _t.getTypeName(type)]);

      _t.fail(message());
    }
  } else if (!(x instanceof type)) {
    _t.fail(message());
  }

  return x;
}
//# sourceMappingURL=index.js.map