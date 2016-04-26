'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configure = configure;
exports.addGlobalProcessor = addGlobalProcessor;
exports.addGlobalHandler = addGlobalHandler;

var _minimatch = require('minimatch');

if (!global.__NIGHTINGALE_CONFIG) {
    global.__NIGHTINGALE_CONFIG = [];
    global.__NIGHTINGALE_GLOBAL_PROCESSORS = [];
    global.__NIGHTINGALE_GLOBAL_HANDLERS = [];
    global.__NIGHTINGALE_LOGGER_MAP_CACHE = new Map();
    global.__NIGHTINGALE_CONFIG_DEFAULT = {
        handlers: [],
        processors: []
    };
}

/**
 * @function
*/function clearCache() {
    global.__NIGHTINGALE_LOGGER_MAP_CACHE.clear();
}

/**
 * @function
 * @param config
*/function configure(config) {
    global.__NIGHTINGALE_CONFIG = [];
    global.__NIGHTINGALE_CONFIG_DEFAULT = null;

    config.reverse().forEach(function (c) {
        if (c.pattern) {
            if (c.patterns) {
                throw new Error('Cannot have pattern and patterns for the same config');
            }
            c.patterns = c.pattern;
            delete c.pattern;
        }

        if (c.handler) {
            if (c.handlers) {
                throw new Error('Cannot have handler and handlers for the same config');
            }
            c.handlers = c.handler;
            delete c.handler;
        }

        if (c.patterns) {
            c.minimatchPatterns = c.patterns.map(function (pattern) {
                return new _minimatch.Minimatch(pattern);
            });
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
            processors: []
        };
    }
}

/**
 * @function
 * @param processor
*/function addGlobalProcessor(processor) {
    clearCache();
    global.__NIGHTINGALE_GLOBAL_PROCESSORS.push(processor);
}

/**
 * @function
 * @param handler
*/function addGlobalHandler(handler) {
    clearCache();
    global.__NIGHTINGALE_GLOBAL_HANDLERS.push(handler);
}

global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = /**
                                              * @function
                                              * @param key
                                             */function (key) {
    var globalProcessors = global.__NIGHTINGALE_GLOBAL_PROCESSORS;
    var globalHandlers = global.__NIGHTINGALE_GLOBAL_HANDLERS;
    var globalCache = global.__NIGHTINGALE_LOGGER_MAP_CACHE;

    if (globalCache.has(key)) {
        return globalCache.get(key);
    }

    var value = global.__NIGHTINGALE_CONFIG.find(function (c) {
        return c.minimatchPatterns.some(function (p) {
            return p.match(key);
        });
    });
    if (!value) {
        value = global.__NIGHTINGALE_CONFIG_DEFAULT;
    }

    var loggerConfig = {
        patterns: value.patterns,
        handlers: value.handlers ? globalHandlers.concat(value.handlers) : globalHandlers,
        processors: value.processors ? globalProcessors.concat(value.processors) : globalProcessors
    };

    globalCache.set(key, loggerConfig);
    return loggerConfig;
};
//# sourceMappingURL=config.js.map