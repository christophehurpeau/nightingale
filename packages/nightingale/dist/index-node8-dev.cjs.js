'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var t = _interopDefault(require('flow-runtime'));
var Logger = _interopDefault(require('nightingale-logger'));
var nightingaleLevels = _interopDefault(require('nightingale-levels'));

const Config = t.type('Config', t.exactObject(t.property('handler', t.nullable(t.object()), true), t.property('handlers', t.nullable(t.array(t.object())), true), t.property('key', t.nullable(t.string()), true), t.property('keys', t.nullable(t.array(t.string())), true), t.property('pattern', t.nullable(t.ref('RegExp')), true), t.property('processor', t.nullable(t.any()), true), t.property('processors', t.nullable(t.array(t.any())), true), t.property('stop', t.nullable(t.boolean()), true)));


if (global.__NIGHTINGALE_GLOBAL_HANDLERS) {
  // eslint-disable-next-line no-console
  throw new Error('nightingale: update all to ^5.0.0');
}

if (!global.__NIGHTINGALE_CONFIG) {
  global.__NIGHTINGALE_CONFIG = [];
  global.__NIGHTINGALE_LOGGER_MAP_CACHE = new Map();
  global.__NIGHTINGALE_CONFIG_DEFAULT = { handlers: [], processors: [] };
}

function clearCache() {
  global.__NIGHTINGALE_LOGGER_MAP_CACHE.clear();
}

function handleConfig(config) {
  t.param('config', Config).assert(config);

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

  if (config.patterns) {
    throw new Error('config.patterns is no longer supported, use pattern');
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
  let _configType2 = Config;
  t.param('config', _configType2).assert(config);

  config = _configType2.assert(handleConfig(config));
  global.__NIGHTINGALE_CONFIG[unshift ? 'unshift' : 'push'](config);
  clearCache();
}

const configIsForKey = key => config => {
  if (config.keys) return config.keys.includes(key);
  if (config.pattern) return config.pattern.test(key);
  return true;
};

global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function getConfigForLogger(key) {
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

global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = function getConfigForLoggerRecord(key, level) {
  const { handlers, processors } = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);

  return {
    handlers: handlers.filter(handler => level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key))),
    processors
  };
};

/**
 * listen to uncaughtException and unhandledRejection
 * @param {Logger} [logger]
 */

function listenUnhandledErrors(logger) {
  let _loggerType = t.nullable(t.ref(Logger));

  t.param('logger', _loggerType).assert(logger);

  if (!logger) logger = _loggerType.assert(new Logger('nightingale.listenUnhandledErrors', 'listenUnhandledErrors'));
  process.on('uncaughtException', err => logger.error('uncaughtException', { err }));
  process.on('unhandledRejection', err => logger.error('unhandledRejection', { err }));
}

exports.levels = nightingaleLevels;
exports.default = Logger;
exports.listenUnhandledErrors = listenUnhandledErrors;
exports.configure = configure;
exports.addConfig = addConfig;
//# sourceMappingURL=index-node8-dev.cjs.js.map
