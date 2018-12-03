import Logger from 'nightingale-logger';
import nightingaleLevels from 'nightingale-levels';
export { default as Level, default as levels } from 'nightingale-levels';

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
  if (global.__NIGHTINGALE_CONFIG.length !== 0) {
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

  if (globalCache.has(key)) {
    return globalCache.get(key);
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

function listenUnhandledErrors(logger = new Logger('nightingale.listenUnhandledErrors', 'listenUnhandledErrors')) {
  process.on('uncaughtException', err => logger.error('uncaughtException', {
    err
  }));
  process.on('unhandledRejection', err => logger.error('unhandledRejection', {
    err
  }));
}

export default Logger;
export { listenUnhandledErrors, configure, addConfig };
//# sourceMappingURL=index-node10.es.js.map
