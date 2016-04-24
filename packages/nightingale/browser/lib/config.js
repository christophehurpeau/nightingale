'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configure = configure;
exports.getForLogger = getForLogger;

var _minimatch = require('minimatch');

if (!global.__NIGHTINGALE_CONFIG) {
    global.__NIGHTINGALE_CONFIG = [];
    global.__NIGHTINGALE_LOGGER_MAP = new Map();
    global.__NIGHTINGALE_CONFIG_DEFAULT = null;
}

/**
 * @function
 * @param config
*/function configure(config) {
    global.__NIGHTINGALE_LOGGER_MAP.clear();
    global.__NIGHTINGALE_CONFIG = [];
    global.__NIGHTINGALE_CONFIG_DEFAULT = null;

    config.reverse().forEach(function (c) {
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
}

/**
 * @function
 * @param key
*/function getForLogger(key) {
    if (global.__NIGHTINGALE_LOGGER_MAP.has(key)) {
        return global.__NIGHTINGALE_LOGGER_MAP.get(key);
    }

    var value = global.__NIGHTINGALE_CONFIG.find(function (c) {
        return c.minimatchPatterns.some(function (p) {
            return p.match(key);
        });
    });
    if (!value) {
        value = global.__NIGHTINGALE_CONFIG_DEFAULT;
    }

    global.__NIGHTINGALE_LOGGER_MAP.set(key, value);

    return value;
}
//# sourceMappingURL=config.js.map