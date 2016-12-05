import _t from 'tcomb-forked';

var Config = _t.interface({
  pattern: _t.maybe(RegExp),
  key: _t.maybe(_t.String),
  keys: _t.maybe(_t.list(_t.String)),
  handler: _t.maybe(_t.Object),
  handlers: _t.maybe(_t.list(_t.Object)),
  processor: _t.maybe(_t.Any),
  processors: _t.maybe(_t.list(_t.Any))
}, 'Config');

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
  _assert(config, Config, 'config');

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

export function addConfig(config, unshift = false) {
  _assert(config, Config, 'config');

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
    if (config.handlers) loggerConfig.handlers.push(...config.handlers);
    if (config.processors) loggerConfig.processors.push(...config.processors);
    return config.stop;
  });

  globalCache.set(key, loggerConfig);
  return loggerConfig;
};

global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = function getConfigForLoggerRecord(key, level) {
  var { handlers, processors } = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);

  return {
    handlers: handlers.filter(function (handler) {
      return level >= handler.minLevel && (!handler.isHandling || handler.isHandling(level, key));
    }),
    processors
  };
};

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
//# sourceMappingURL=config.js.map