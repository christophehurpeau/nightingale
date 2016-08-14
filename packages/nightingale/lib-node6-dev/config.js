'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configure = configure;
exports.addConfig = addConfig;
exports.addGlobalProcessor = addGlobalProcessor;
exports.addGlobalHandler = addGlobalHandler;

var _minimatch = require('minimatch');

const Config = function () {
    function Config(input) {
        return input != null && (input.pattern == null || typeof input.pattern === 'string') && (input.patterns == null || Array.isArray(input.patterns) && input.patterns.every(function (item) {
            return typeof item === 'string';
        })) && (input.handler == null || input.handler instanceof Object) && (input.handlers == null || Array.isArray(input.handlers) && input.handlers.every(function (item) {
            return item instanceof Object;
        }));
    }

    ;
    Object.defineProperty(Config, Symbol.hasInstance, {
        value: function value(input) {
            return Config(input);
        }
    });
    return Config;
}();

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

function clearCache() {
    global.__NIGHTINGALE_LOGGER_MAP_CACHE.clear();
}

function handleConfig(config) {
    if (!Config(config)) {
        throw new TypeError('Value of argument "config" violates contract.\n\nExpected:\nConfig\n\nGot:\n' + _inspect(config));
    }

    if (config.key) {
        if (config.patterns) {
            throw new Error('Cannot have key and patterns for the same config');
        }
        config.patterns = [config.key];
        delete config.key;
    }

    if (config.pattern) {
        if (config.patterns) {
            throw new Error('Cannot have pattern and patterns for the same config');
        }
        config.patterns = [config.pattern];
        delete config.pattern;
    }

    if (config.handler) {
        if (config.handlers) {
            throw new Error('Cannot have handler and handlers for the same config');
        }
        config.handlers = [config.handler];
        delete config.handler;
    }

    if (config.patterns) {
        config.minimatchPatterns = config.patterns.map(pattern => {
            return new _minimatch.Minimatch(pattern);
        });
    }

    return config;
}

function configure(config) {
    if (global.__NIGHTINGALE_CONFIG.length !== 0) {
        // eslint-disable-next-line no-console
        console.log('nightingale: warning: config overridden');
    }

    clearCache();
    global.__NIGHTINGALE_CONFIG = [];
    global.__NIGHTINGALE_CONFIG_DEFAULT = null;

    config.reverse().forEach(config => {
        config = handleConfig(config);

        if (config.patterns) {
            global.__NIGHTINGALE_CONFIG.push(config);
        } else {
            if (global.__NIGHTINGALE_CONFIG_DEFAULT) {
                throw new Error('Config cannot contains more than 1 default declaration');
            }

            global.__NIGHTINGALE_CONFIG_DEFAULT = config;
        }
    });

    if (!global.__NIGHTINGALE_CONFIG_DEFAULT) {
        global.__NIGHTINGALE_CONFIG_DEFAULT = {
            handlers: [],
            processors: []
        };
    }
}

function addConfig(config) {
    let unshift = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    if (!Config(config)) {
        throw new TypeError('Value of argument "config" violates contract.\n\nExpected:\nConfig\n\nGot:\n' + _inspect(config));
    }

    config = handleConfig(config);

    if (!config.patterns) {
        throw new Error('Config must have `pattern` or `patterns`');
    }

    clearCache();
    global.__NIGHTINGALE_CONFIG[unshift ? 'unshift' : 'push'](config);
}

function addGlobalProcessor(processor) {
    clearCache();
    global.__NIGHTINGALE_GLOBAL_PROCESSORS.push(processor);
}

function addGlobalHandler(handler) {
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

    let value = global.__NIGHTINGALE_CONFIG.find(c => {
        return c.minimatchPatterns.some(p => {
            return p.match(key);
        });
    });
    if (!value) {
        value = global.__NIGHTINGALE_CONFIG_DEFAULT;
    }

    let loggerConfig = {
        patterns: value.patterns,
        handlers: value.handlers ? globalHandlers.concat(value.handlers) : globalHandlers,
        processors: value.processors ? globalProcessors.concat(value.processors) : globalProcessors
    };

    globalCache.set(key, loggerConfig);
    return loggerConfig;
};

function _inspect(input, depth) {
    const maxDepth = 4;
    const maxKeys = 15;

    if (depth === undefined) {
        depth = 0;
    }

    depth += 1;

    if (input === null) {
        return 'null';
    } else if (input === undefined) {
        return 'void';
    } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
        return typeof input;
    } else if (Array.isArray(input)) {
        if (input.length > 0) {
            if (depth > maxDepth) return '[...]';

            const first = _inspect(input[0], depth);

            if (input.every(item => _inspect(item, depth) === first)) {
                return first.trim() + '[]';
            } else {
                return '[' + input.slice(0, maxKeys).map(item => _inspect(item, depth)).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']';
            }
        } else {
            return 'Array';
        }
    } else {
        const keys = Object.keys(input);

        if (!keys.length) {
            if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
                return input.constructor.name;
            } else {
                return 'Object';
            }
        }

        if (depth > maxDepth) return '{...}';
        const indent = '  '.repeat(depth - 1);
        let entries = keys.slice(0, maxKeys).map(key => {
            return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
        }).join('\n  ' + indent);

        if (keys.length >= maxKeys) {
            entries += '\n  ' + indent + '...';
        }

        if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
            return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
        } else {
            return '{\n  ' + indent + entries + '\n' + indent + '}';
        }
    }
}
//# sourceMappingURL=config.js.map