'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingaleLevels = require('nightingale-levels');
var Logger = require('nightingale-logger');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var nightingaleLevels__default = /*#__PURE__*/_interopDefaultLegacy(nightingaleLevels);
var Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);

if (!global.__NIGHTINGALE_CONFIG) {
  global.__NIGHTINGALE_CONFIG = [];
  global.__NIGHTINGALE_LOGGER_MAP_CACHE = new Map();
  global.__NIGHTINGALE_CONFIG_DEFAULT = {
    handlers: [],
    processors: []
  };
}

function clearCache() {
  global.__NIGHTINGALE_LOGGER_MAP_CACHE.clear();
}

function handleConfig(config) {
  if (config.keys) {
    if (config.pattern) {
      throw new Error('Cannot have key and pattern for the same config');
    }

    if (config.key) {
      throw new Error('Cannot have key and keys for the same config');
    }
  } else if (config.key) {
    if (config.pattern) {
      throw new Error('Cannot have key and pattern for the same config');
    }

    config.keys = [config.key];
    delete config.key;
  }

  if (config.handler) {
    if (config.handlers) {
      throw new Error('Cannot have handler and handlers for the same config');
    }

    config.handlers = [config.handler];
    delete config.handler;
  }

  if (config.processor) {
    if (config.processors) {
      throw new Error('Cannot have processors and processors for the same config');
    }

    config.processors = [config.processor];
    delete config.processor;
  }

  return config;
}

function configure(config) {
  if (global.__NIGHTINGALE_CONFIG.length > 0) {
    // eslint-disable-next-line no-console
    console.log('nightingale: warning: config overridden');
  }

  clearCache();
  global.__NIGHTINGALE_CONFIG = config.map(handleConfig);
}
function addConfig(config, unshift) {
  if (unshift === void 0) {
    unshift = false;
  }

  config = handleConfig(config);

  global.__NIGHTINGALE_CONFIG[unshift ? 'unshift' : 'push'](config);

  clearCache();
}

var configIsForKey = function configIsForKey(key) {
  return function (config) {
    if (config.keys) return config.keys.includes(key);
    if (config.pattern) return config.pattern.test(key);
    return true;
  };
};

global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function (key) {
  var globalCache = global.__NIGHTINGALE_LOGGER_MAP_CACHE;
  var existingCache = globalCache.get(key);

  if (existingCache) {
    return existingCache;
  }

  var loggerConfig = {
    handlers: [],
    processors: []
  };

  global.__NIGHTINGALE_CONFIG.filter(configIsForKey(key)).some(function (config) {
    var _loggerConfig$handler, _loggerConfig$process;

    if (config.handlers) (_loggerConfig$handler = loggerConfig.handlers).push.apply(_loggerConfig$handler, config.handlers);
    if (config.processors) (_loggerConfig$process = loggerConfig.processors).push.apply(_loggerConfig$process, config.processors);
    return config.stop;
  });

  globalCache.set(key, loggerConfig);
  return loggerConfig;
};

if (global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
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

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */

function listenUnhandledErrors(logger) {
  if (logger === void 0) {
    logger = new Logger__default('nightingale.listenUnhandledErrors', 'listenUnhandledErrors');
  }

  process.on('uncaughtException', function (error) {
    return logger.error('uncaughtException', {
      error,
      unhandled: true
    });
  });
  process.on('unhandledRejection', function (error) {
    return logger.error('unhandledRejection', {
      error,
      unhandled: true
    });
  });
}

exports.Level = nightingaleLevels__default;
exports.levels = nightingaleLevels__default;
exports.Logger = Logger__default;
exports.default = Logger__default;
exports.addConfig = addConfig;
exports.configure = configure;
exports.listenUnhandledErrors = listenUnhandledErrors;
//# sourceMappingURL=index-browser.cjs.js.map
