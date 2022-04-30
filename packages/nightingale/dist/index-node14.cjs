'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleLogger = require('nightingale-logger');
const nightingaleLevels = require('nightingale-levels');

const globalOrWindow = typeof global !== 'undefined' ? global : window;

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
function addConfig(config, unshift = false) {
  config = handleConfig(config);

  globalOrWindow.__NIGHTINGALE_CONFIG[unshift ? 'unshift' : 'push'](config);

  clearCache();
}

const configIsForKey = key => config => {
  if (config.keys) return config.keys.includes(key);
  if (config.pattern) return config.pattern.test(key);
  return true;
};

globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = key => {
  const globalCache = globalOrWindow.__NIGHTINGALE_LOGGER_MAP_CACHE;
  const existingCache = globalCache.get(key);

  if (existingCache) {
    return existingCache;
  }

  const loggerConfig = {
    handlers: [],
    processors: []
  };

  globalOrWindow.__NIGHTINGALE_CONFIG.filter(configIsForKey(key)).some(config => {
    if (config.handlers) loggerConfig.handlers.push(...config.handlers);
    if (config.processors) loggerConfig.processors.push(...config.processors);
    return config.stop;
  });

  globalCache.set(key, loggerConfig);
  return loggerConfig;
};

if (globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = (key, level) => {
    const {
      handlers,
      processors
    } = globalOrWindow.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);

    return {
      handlers: handlers.filter(handler => level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key))),
      processors
    };
  };
}

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */

function listenUnhandledErrors(logger = new nightingaleLogger.Logger('nightingale:listenUnhandledErrors', 'UnhandledErrors')) {
  process.on('uncaughtException', error => {
    logger.error('uncaughtException', {
      error,
      unhandled: true
    });
  });
  process.on('unhandledRejection', error => {
    logger.error('unhandledRejection', {
      error,
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
//# sourceMappingURL=index-node14.cjs.map
