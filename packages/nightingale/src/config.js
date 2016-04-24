import { Minimatch } from 'minimatch';

if (!global.__NIGHTINGALE_CONFIG) {
    global.__NIGHTINGALE_CONFIG = [];
    global.__NIGHTINGALE_LOGGER_MAP = new Map();
    global.__NIGHTINGALE_CONFIG_DEFAULT = null;
}

export function configure(config) {
    global.__NIGHTINGALE_LOGGER_MAP.clear();
    global.__NIGHTINGALE_CONFIG = [];
    global.__NIGHTINGALE_CONFIG_DEFAULT = null;

    config.reverse().forEach(c => {
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
}

export function getForLogger(key) {
    if (global.__NIGHTINGALE_LOGGER_MAP.has(key)) {
        return global.__NIGHTINGALE_LOGGER_MAP.get(key);
    }

    let value = global.__NIGHTINGALE_CONFIG.find(c => c.minimatchPatterns.some(p => p.match(key)));
    if (!value) {
        value = global.__NIGHTINGALE_CONFIG_DEFAULT;
    }

    global.__NIGHTINGALE_LOGGER_MAP.set(key, value);

    return value;
}
