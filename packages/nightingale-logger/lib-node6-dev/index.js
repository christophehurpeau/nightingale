'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RecordType = _tcombForked2.default.interface({
  level: _tcombForked2.default.Number,
  key: _tcombForked2.default.String,
  displayName: _tcombForked2.default.maybe(_tcombForked2.default.String),
  datetime: Date,
  message: _tcombForked2.default.String,
  context: _tcombForked2.default.maybe(_tcombForked2.default.Object),
  metadata: _tcombForked2.default.maybe(_tcombForked2.default.Object),
  extra: _tcombForked2.default.maybe(_tcombForked2.default.Object)
}, 'RecordType');

const HandlerType = _tcombForked2.default.interface({
  minLevel: _tcombForked2.default.Number,
  isHandling: _tcombForked2.default.maybe(_tcombForked2.default.Function),
  handle: _tcombForked2.default.maybe(_tcombForked2.default.Function)
}, 'HandlerType');

const ProcessorType = _tcombForked2.default.Function;

const ConfigForLoggerType = _tcombForked2.default.interface({
  handlers: _tcombForked2.default.list(HandlerType),
  processors: _tcombForked2.default.list(ProcessorType)
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
    _assert(key, _tcombForked2.default.String, 'key');

    _assert(level, _tcombForked2.default.Number, 'level');

    return _assert((() => {
      var _global$__NIGHTINGALE = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);

      const handlers = _global$__NIGHTINGALE.handlers,
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
  _assert(key, _tcombForked2.default.String, 'key');

  _assert(recordLevel, _tcombForked2.default.Number, 'recordLevel');

  return _assert(function () {
    return global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD(key, recordLevel);
  }.apply(this, arguments), ConfigForLoggerType, 'return value');
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
    _assert(key, _tcombForked2.default.String, 'key');

    _assert(displayName, _tcombForked2.default.maybe(_tcombForked2.default.String), 'displayName');

    if (key.includes('.')) {
      this.warn('nightingale: `.` in key is deprecated, replace with `:`', { key, displayName });
      key = key.replace(/\./g, ':');
    }
    this.key = key;
    this.displayName = displayName;
  }

  /** @private */
  getHandlersAndProcessors(recordLevel) {
    _assert(recordLevel, _tcombForked2.default.Number, 'recordLevel');

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
    _assert(childSuffixKey, _tcombForked2.default.String, 'childSuffixKey');

    _assert(childDisplayName, _tcombForked2.default.maybe(_tcombForked2.default.String), 'childDisplayName');

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
    _assert(context, _tcombForked2.default.Object, 'context');

    return _assert(function () {
      const logger = new Logger(this.key);
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
    _assert(context, _tcombForked2.default.Object, 'context');

    this._context = context;
  }

  /**
   * Extends existing context of this logger
   */
  extendsContext(extendedContext) {
    _assert(extendedContext, _tcombForked2.default.Object, 'extendedContext');

    Object.assign(this._context, extendedContext);
  }

  /**
   * Handle a record
   *
   * Use this only if you know what you are doing.
   */
  addRecord(record) {
    _assert(record, _tcombForked2.default.Object, 'record');

    var _getHandlersAndProces = this.getHandlersAndProcessors(record.level);

    let handlers = _getHandlersAndProces.handlers,
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
      processors.forEach(process => process(record, record.context));
    }

    handlers.some(handler => handler.handle(record) === false);
  }

  /**
   * Log a message
   */
  log(message, metadata) {
    let level = _assert(arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _nightingaleLevels2.default.INFO, _tcombForked2.default.Number, 'level');

    let options = _assert(arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'options');

    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadata');

    _assert(level, _tcombForked2.default.Number, 'level');

    _assert(options, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'options');

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
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    this.log(message, metadata, _nightingaleLevels2.default.TRACE, { metadataStyles });
  }

  /**
   * Log a debug message
   */
  debug(message, metadata, metadataStyles) {
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    this.log(message, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles });
  }

  /**
   * Log an info message
   */
  info(message, metadata, metadataStyles) {
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    this.log(message, metadata, _nightingaleLevels2.default.INFO, { metadataStyles });
  }

  /**
   * Log a warn message
   */
  warn(message, metadata, metadataStyles) {
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    this.log(message, metadata, _nightingaleLevels2.default.WARN, { metadataStyles });
  }

  /**
   * Log an error message
   */
  error(message) {
    let metadata = _assert(arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _tcombForked2.default.Object, 'metadata');

    let metadataStyles = _assert(arguments[2], _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    _assert(message, _tcombForked2.default.union([_tcombForked2.default.String, Error]), 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    if (message instanceof Error) {
      metadata.error = message;
      message = `${ metadata.error.name }: ${ metadata.error.message }`;
    }
    this.log(message, metadata, _nightingaleLevels2.default.ERROR, { metadataStyles });
  }

  /**
   * Log an alert message
   */
  alert(message, metadata, metadataStyles) {
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    this.log(message, metadata, _nightingaleLevels2.default.ALERT, { metadataStyles });
  }

  /**
   * Log a fatal message
   */
  fatal(message, metadata, metadataStyles) {
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    this.log(message, metadata, _nightingaleLevels2.default.FATAL, { metadataStyles });
  }

  /**
   * Log an inspected value
   */
  inspectValue(value, metadata, metadataStyles) {
    _assert(value, _tcombForked2.default.Any, 'value');

    _assert(metadata, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    // Note: inspect is a special function for node:
    // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
    value = _util2.default.inspect(value, { depth: 6 });
    this.log(value, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles, styles: ['gray'] });
  }

  /**
   * Log a debugged var
   */
  inspectVar(varName, varValue, metadata, metadataStyles) {
    _assert(varName, _tcombForked2.default.String, 'varName');

    _assert(varValue, _tcombForked2.default.Any, 'varValue');

    _assert(metadata, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    varValue = _util2.default.inspect(varValue, { depth: 6 });
    this.log(`${ varName } = ${ varValue }`, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles, styles: ['cyan'] });
  }

  /**
   * Alias for infoSuccess
   */
  success(message, metadata, metadataStyles) {
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    this.infoSuccess(message, metadata, metadataStyles);
  }

  /**
   * Log an info success message
   */
  infoSuccess(message, metadata, metadataStyles) {
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

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
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

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
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    this.infoFail(message, metadata, metadataStyles);
  }

  /**
   * Log an info fail message
   */
  infoFail(message, metadata, metadataStyles) {
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

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
    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    this.log(message, metadata, _nightingaleLevels2.default.DEBUG, {
      metadataStyles,
      symbol: '✖',
      styles: ['red']
    });
  }

  /**
   * @returns {number} time to pass to timeEnd
   */
  time(message, metadata, metadataStyles) {
    let level = _assert(arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _nightingaleLevels2.default.DEBUG, _tcombForked2.default.Number, 'level');

    _assert(message, _tcombForked2.default.maybe(_tcombForked2.default.String), 'message');

    _assert(metadata, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    _assert(level, _tcombForked2.default.Number, 'level');

    return _assert(function () {
      if (message) {
        this.log(message, metadata, level, { metadataStyles });
      }

      return Date.now();
    }.apply(this, arguments), _tcombForked2.default.Number, 'return value');
  }

  infoTime(message, metadata, metadataStyles) {
    _assert(message, _tcombForked2.default.maybe(_tcombForked2.default.String), 'message');

    _assert(metadata, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    return _assert(function () {
      return this.time(message, metadata, metadataStyles, _nightingaleLevels2.default.INFO);
    }.apply(this, arguments), _tcombForked2.default.Number, 'return value');
  }

  /**
   * Finds difference between when this method
   * was called and when the respective time method
   * was called, then logs out the difference
   * and deletes the original record
   */
  timeEnd(startTime, message) {
    let metadata = _assert(arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}, _tcombForked2.default.Object, 'metadata');

    let metadataStyles = _assert(arguments[3], _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    let level = _assert(arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _nightingaleLevels2.default.DEBUG, _tcombForked2.default.Number, 'level');

    let options = _assert(arguments[5], _tcombForked2.default.maybe(_tcombForked2.default.Object), 'options');

    _assert(startTime, _tcombForked2.default.Number, 'startTime');

    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.Object, 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    _assert(level, _tcombForked2.default.Number, 'level');

    _assert(options, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'options');

    const now = Date.now();

    const diffTime = now - startTime;

    if (diffTime < 1000) {
      metadata.readableTime = `${ diffTime }ms`;
    } else {
      const seconds = diffTime > 1000 && Math.floor(diffTime / 1000);

      metadata.readableTime = `${ seconds ? `${ seconds }s and ` : '' }${ diffTime - seconds * 1000 }ms`;
    }

    metadata.timeMs = diffTime;
    this.log(message, metadata, level, _extends({}, options, { metadataStyles }));
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoTimeEnd(time, message, metadata, metadataStyles) {
    _assert(time, _tcombForked2.default.Number, 'time');

    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    this.timeEnd(time, message, metadata, metadataStyles, _nightingaleLevels2.default.INFO);
  }

  /**
   * Like timeEnd, but with INFO level
   */
  infoSuccessTimeEnd(time, message, metadata, metadataStyles) {
    _assert(time, _tcombForked2.default.Number, 'time');

    _assert(message, _tcombForked2.default.String, 'message');

    _assert(metadata, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

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
    _assert(fn, _tcombForked2.default.Function, 'fn');

    _assert(metadata, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    metadata = _extends({
      functionName: fn.name
    }, metadata);
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
    _assert(fn, _tcombForked2.default.Function, 'fn');

    _assert(metadata, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadata');

    _assert(metadataStyles, _tcombForked2.default.maybe(_tcombForked2.default.Object), 'metadataStyles');

    metadata = _extends({
      functionName: fn.name
    }, metadata);
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
    _assert(fn, _tcombForked2.default.Function, 'fn');

    _assert(metadata, _tcombForked2.default.union([_tcombForked2.default.maybe(_tcombForked2.default.Object), _tcombForked2.default.Function]), 'metadata');

    _assert(metadataStyles, _tcombForked2.default.union([_tcombForked2.default.maybe(_tcombForked2.default.Object), _tcombForked2.default.Function]), 'metadataStyles');

    _assert(callback, _tcombForked2.default.Function, 'callback');

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
exports.default = Logger;

function _assert(x, type, name) {
  function message() {
    return 'Invalid value ' + _tcombForked2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcombForked2.default.getTypeName(type) + ')';
  }

  if (_tcombForked2.default.isType(type)) {
    if (!type.is(x)) {
      type(x, [name + ': ' + _tcombForked2.default.getTypeName(type)]);

      _tcombForked2.default.fail(message());
    }
  } else if (!(x instanceof type)) {
    _tcombForked2.default.fail(message());
  }

  return x;
}
//# sourceMappingURL=index.js.map