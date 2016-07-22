import { Minimatch } from 'minimatch';

if (!global.__NIGHTINGALE_CONFIG) {
    global.__NIGHTINGALE_CONFIG = [];
    global.__NIGHTINGALE_GLOBAL_PROCESSORS = [];
    global.__NIGHTINGALE_GLOBAL_HANDLERS = [];
    global.__NIGHTINGALE_LOGGER_MAP_CACHE = new Map();
    global.__NIGHTINGALE_CONFIG_DEFAULT = {
        handlers: [],
        processors: [],
    };
}

function clearCache() {
    global.__NIGHTINGALE_LOGGER_MAP_CACHE.clear();
}

export function configure(config) {
    global.__NIGHTINGALE_CONFIG = [];
    global.__NIGHTINGALE_CONFIG_DEFAULT = null;

    config.reverse().forEach(c => {
        if (c.pattern) {
            if (c.patterns) {
                throw new Error('Cannot have pattern and patterns for the same config');
            }
            c.patterns = [c.pattern];
            delete c.pattern;
        }

        if (c.handler) {
            if (c.handlers) {
                throw new Error('Cannot have handler and handlers for the same config');
            }
            c.handlers = [c.handler];
            delete c.handler;
        }

        if (c.patterns) {
            c.minimatchPatterns = c.patterns.map(pattern => new Minimatch(pattern));
            global.__NIGHTINGALE_CONFIG.push(c);
        } else {
            if (global.__NIGHTINGALE_CONFIG_DEFAULT) {
                throw new Error('Config cannot contains more than 1 default declaration');
            }

            global.__NIGHTINGALE_CONFIG_DEFAULT = c;
        }
    });

    if (!global.__NIGHTINGALE_CONFIG_DEFAULT) {
        global.__NIGHTINGALE_CONFIG_DEFAULT = {
            handlers: [],
            processors: [],
        };
    }
}

export function addGlobalProcessor(processor) {
    clearCache();
    global.__NIGHTINGALE_GLOBAL_PROCESSORS.push(processor);
}

export function addGlobalHandler(handler) {
    clearCache();
    global.__NIGHTINGALE_GLOBAL_HANDLERS.push(handler);
}

global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = function (key) {
    const globalProcessors = global.__NIGHTINGALE_GLOBAL_PROCESSORS;
    const globalHandlers = global.__NIGHTINGALE_GLOBAL_HANDLERS;
    const globalCache = global.__NIGHTINGALE_LOGGER_MAP_CACHE;

    if (globalCache.has(key)) {
        return globalCache.get(key);
    }

    let value = global.__NIGHTINGALE_CONFIG.find(c => c.minimatchPatterns.some(p => p.match(key)));
    if (!value) {
        value = global.__NIGHTINGALE_CONFIG_DEFAULT;
    }

    let loggerConfig = {
        patterns: value.patterns,
        handlers: value.handlers ? globalHandlers.concat(value.handlers) : globalHandlers,
        processors: value.processors ? globalProcessors.concat(value.processors) : globalProcessors,
    };

    globalCache.set(key, loggerConfig);
    return loggerConfig;
};
