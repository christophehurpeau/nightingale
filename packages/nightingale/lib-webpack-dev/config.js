function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import t from 'flow-runtime';
var Config = t.type('Config', t.exactObject(t.property('stop', t.nullable(t.boolean())), t.property('pattern', t.nullable(t.ref('RegExp'))), t.property('key', t.nullable(t.string())), t.property('keys', t.nullable(t.array(t.string()))), t.property('handler', t.nullable(t.object())), t.property('handlers', t.nullable(t.array(t.object()))), t.property('processor', t.nullable(t.any())), t.property('processors', t.nullable(t.array(t.any())))));


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

export function configure(config) {
  if (global.__NIGHTINGALE_CONFIG.length !== 0) {
    // eslint-disable-next-line no-console
    console.log('nightingale: warning: config overridden');
  }

  clearCache();
  global.__NIGHTINGALE_CONFIG = config.map(handleConfig);
}

export function addConfig(config) {
  var unshift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var _configType2 = Config;
  t.param('config', _configType2).assert(config);

  config = _configType2.assert(handleConfig(config));
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

global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function getConfigForLogger(key) {
  var globalCache = global.__NIGHTINGALE_LOGGER_MAP_CACHE;

  if (globalCache.has(key)) {
    return globalCache.get(key);
  }

  var loggerConfig = {
    handlers: [],
    processors: []
  };

  global.__NIGHTINGALE_CONFIG.filter(configIsForKey(key)).some(function (config) {
    var _loggerConfig$handler, _loggerConfig$process;

    if (config.handlers) (_loggerConfig$handler = loggerConfig.handlers).push.apply(_loggerConfig$handler, _toConsumableArray(config.handlers));
    if (config.processors) (_loggerConfig$process = loggerConfig.processors).push.apply(_loggerConfig$process, _toConsumableArray(config.processors));
    return config.stop;
  });

  globalCache.set(key, loggerConfig);
  return loggerConfig;
};

global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = function getConfigForLoggerRecord(key, level) {
  var _global$__NIGHTINGALE = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key),
      handlers = _global$__NIGHTINGALE.handlers,
      processors = _global$__NIGHTINGALE.processors;

  return {
    handlers: handlers.filter(function (handler) {
      return level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key));
    }),
    processors: processors
  };
};
//# sourceMappingURL=config.js.map