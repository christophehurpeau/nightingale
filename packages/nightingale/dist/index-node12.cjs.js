'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleLevels = require('nightingale-levels');
const Logger = require('nightingale-logger');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const nightingaleLevels__default = /*#__PURE__*/_interopDefaultLegacy(nightingaleLevels);
const Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);

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
function addConfig(config, unshift = false) {
  config = handleConfig(config);

  global.__NIGHTINGALE_CONFIG[unshift ? 'unshift' : 'push'](config);

  clearCache();
}

const configIsForKey = key => config => {
  if (config.keys) return config.keys.includes(key);
  if (config.pattern) return config.pattern.test(key);
  return true;
};

global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = key => {
  const globalCache = global.__NIGHTINGALE_LOGGER_MAP_CACHE;
  const existingCache = globalCache.get(key);

  if (existingCache) {
    return existingCache;
  }

  const loggerConfig = {
    handlers: [],
    processors: []
  };

  global.__NIGHTINGALE_CONFIG.filter(configIsForKey(key)).some(config => {
    if (config.handlers) loggerConfig.handlers.push(...config.handlers);
    if (config.processors) loggerConfig.processors.push(...config.processors);
    return config.stop;
  });

  globalCache.set(key, loggerConfig);
  return loggerConfig;
};

if (global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = (key, level) => {
    const {
      handlers,
      processors
    } = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);

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

function listenUnhandledErrors(logger = new Logger__default('nightingale.listenUnhandledErrors', 'listenUnhandledErrors')) {
  process.on('uncaughtException', error => logger.error('uncaughtException', {
    error,
    unhandled: true
  }));
  process.on('unhandledRejection', error => logger.error('unhandledRejection', {
    error,
    unhandled: true
  }));
}

exports.Level = nightingaleLevels__default;
exports.levels = nightingaleLevels__default;
exports.Logger = Logger__default;
exports.default = Logger__default;
exports.addConfig = addConfig;
exports.configure = configure;
exports.listenUnhandledErrors = listenUnhandledErrors;
//# sourceMappingURL=index-node12.cjs.js.map
