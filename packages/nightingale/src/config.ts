import { POB_ENV } from 'pob-babel';
import type { ComputedConfigForKey, Config } from 'nightingale-logger';
import type { Handler } from 'nightingale-types';

if (POB_ENV !== 'production' && global.__NIGHTINGALE_GLOBAL_HANDLERS) {
  throw new Error('nightingale: update all to ^5.0.0');
}

if (!global.__NIGHTINGALE_CONFIG) {
  global.__NIGHTINGALE_CONFIG = [];
  global.__NIGHTINGALE_LOGGER_MAP_CACHE = new Map<
    string,
    ComputedConfigForKey
  >();
  global.__NIGHTINGALE_CONFIG_DEFAULT = { handlers: [], processors: [] };
}

function clearCache(): void {
  global.__NIGHTINGALE_LOGGER_MAP_CACHE.clear();
}

function handleConfig(config: Config): Config {
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
      throw new Error(
        'Cannot have processors and processors for the same config',
      );
    }
    config.processors = [config.processor];
    delete config.processor;
  }

  return config;
}

export function configure(config: Config[]): void {
  if (global.__NIGHTINGALE_CONFIG.length > 0) {
    // eslint-disable-next-line no-console
    console.log('nightingale: warning: config overridden');
  }

  clearCache();
  global.__NIGHTINGALE_CONFIG = config.map(handleConfig);
}

export function addConfig(config: Config, unshift = false): void {
  config = handleConfig(config);
  global.__NIGHTINGALE_CONFIG[unshift ? 'unshift' : 'push'](config);
  clearCache();
}

const configIsForKey = (key: string) => (config: Config) => {
  if (config.keys) return config.keys.includes(key);
  if (config.pattern) return config.pattern.test(key);
  return true;
};

global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = (
  key: string,
): ComputedConfigForKey => {
  const globalCache = global.__NIGHTINGALE_LOGGER_MAP_CACHE;

  const existingCache = globalCache.get(key);

  if (existingCache) {
    return existingCache;
  }

  const loggerConfig: ComputedConfigForKey = {
    handlers: [],
    processors: [],
  };

  global.__NIGHTINGALE_CONFIG
    .filter(configIsForKey(key))
    .some((config: Config) => {
      if (config.handlers) loggerConfig.handlers.push(...config.handlers);
      if (config.processors) loggerConfig.processors.push(...config.processors);
      return config.stop;
    });

  globalCache.set(key, loggerConfig);
  return loggerConfig;
};

if (global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD) {
  global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER_RECORD = (
    key: string,
    level: number,
  ): ComputedConfigForKey => {
    const {
      handlers,
      processors,
    }: ComputedConfigForKey = global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);

    return {
      handlers: handlers.filter(
        (handler: Handler) =>
          level >= handler.minLevel &&
          (!handler.isHandling || handler.isHandling(level, key)),
      ),
      processors,
    };
  };
}
