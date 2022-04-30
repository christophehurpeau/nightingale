'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingaleLogger = require('nightingale-logger');
var nightingaleLevels = require('nightingale-levels');

var globalOrWindow = typeof global !== 'undefined' ? global : window;

if (process.env.NODE_ENV !== "production" && globalOrWindow.__NIGHTINGALE_GLOBAL_HANDLERS) {
  throw new Error('nightingale: update all to ^5.0.0');
}

if (!globalOrWindow.__NIGHTINGALE_CONFIG) {
  globalOrWindow.__NIGHTINGALE_CONFIG = [];
  globalOrWindow.__NIGHTINGALE_LOGGER_MAP_CACHE = new Map();
  globalOrWindow.__NIGHTINGALE_CONFIG_DEFAULT = {
    handlers: [],
    processors: []
  };
}

function clearCache() {
  globalOrWindow.__NIGHTINGALE_LOGGER_MAP_CACHE.clear();
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
  if (globalOrWindow.__NIGHTINGALE_CONFIG.length > 0) {
    // eslint-disable-next-line no-console
    console.log('nightingale: warning: config overridden');
  }

  clearCache();
  globalOrWindow.__NIGHTINGALE_CONFIG = config.map(handleConfig);
}
function addConfig(config, unshift) {
  if (unshift === void 0) {
    unshift = false;
  }

  config = handleConfig(config);

  globalOrWindow.__NIGHTINGALE_CONFIG[unshift ? 'unshift' : 'push'](config);

  clearCache();
}

var configIsForKey = function configIsForKey(key) {
  return function (config) {
    if (config.keys) return config.keys.includes(key);
    if (config.pattern) return config.pattern.test(key);
    return true;
  };
};

globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function (key) {
  var globalCache = globalOrWindow.__NIGHTINGALE_LOGGER_MAP_CACHE;
  var existingCache = globalCache.get(key);

  if (existingCache) {
    return existingCache;
  }

  var loggerConfig = {
    handlers: [],
    processors: []
  };

  globalOrWindow.__NIGHTINGALE_CONFIG.filter(configIsForKey(key)).some(function (config) {
    var _loggerConfig$handler, _loggerConfig$process;

    if (config.handlers) (_loggerConfig$handler = loggerConfig.handlers).push.apply(_loggerConfig$handler, config.handlers);
    if (config.processors) (_loggerConfig$process = loggerConfig.processors).push.apply(_loggerConfig$process, config.processors);
    return config.stop;
  });

  globalCache.set(key, loggerConfig);
  return loggerConfig;
};

if (globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = function (key, level) {
    var _globalOrWindow$__NIG = globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key),
        handlers = _globalOrWindow$__NIG.handlers,
        processors = _globalOrWindow$__NIG.processors;

    return {
      handlers: handlers.filter(function (handler) {
        return level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key));
      }),
      processors: processors
    };
  };
}

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */

function listenUnhandledErrors(logger) {
  if (logger === void 0) {
    logger = new nightingaleLogger.Logger('nightingale:listenUnhandledErrors', 'UnhandledErrors');
  }

  process.on('uncaughtException', function (error) {
    logger.error('uncaughtException', {
      error: error,
      unhandled: true
    });
  });
  process.on('unhandledRejection', function (error) {
    logger.error('unhandledRejection', {
      error: error,
      unhandled: true
    });
  });
}

exports.Logger = nightingaleLogger.Logger;
exports.Level = nightingaleLevels.Level;
exports.levels = nightingaleLevels.Level;
exports.addConfig = addConfig;
exports.configure = configure;
exports.listenUnhandledErrors = listenUnhandledErrors;
//# sourceMappingURL=index-browser.cjs.js.map
