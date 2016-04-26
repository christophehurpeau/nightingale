'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER) {
    global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER = /**
                                                  * @function
                                                 */function () {
        return { handlers: [], processors: [] };
    };
}

/**
 * @function
 * @param key
*/function getConfigForLogger(key) {
    return global.__NIGHTINGALE_GET_CONFIG_FOR_LOGGER(key);
}

/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */
let Logger = class Logger {

    /**
     * Create a new Logger
     *
     * @param {string} key
     * @param {string} displayName
    */
    constructor(key, displayName) {
        this.key = key;
        this.displayName = displayName;
    }

    getConfig() {
        return getConfigForLogger(this.key);
    }

    /**
     * Handle a record
     *
     * Use this only if you know what you are doing.
     *
     * @param {Object} record
    */
    addRecord(record) {
        var _getConfig = this.getConfig();

        let handlers = _getConfig.handlers;
        let processors = _getConfig.processors;

        handlers = handlers.filter(handler => handler.isHandling(record.level));
        if (handlers.length === 0) {
            return;
        }

        if (processors) {
            processors.forEach(process => process(record, record.context));
        }

        handlers.some(handler => handler.handle(record) === false);
    }

    /**
     * Log a message
     *
     * @param {string} message
     * @param {Object} metadata
     * @param {int} [level]
     * @param {Object} [options]
     * @return {Logger}
    */
    log(message, metadata) {
        let level = arguments.length <= 2 || arguments[2] === undefined ? _nightingaleLevels2.default.INFO : arguments[2];
        let options = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

        let context = metadata && metadata.context;
        if (metadata) {
            delete metadata.context;
        }

        let record = {
            level: level,
            key: this.key,
            displayName: this.displayName,
            datetime: new Date(),
            message: message,
            context: context,
            metadata: metadata,
            extra: {}
        };

        if (options) {
            record = Object.assign(options, record);
        }

        this.addRecord(record);
        return this;
    }

    /**
     * Log a trace message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    trace(message, metadata, metadataStyles) {
        return this.log(message, metadata, _nightingaleLevels2.default.TRACE, { metadataStyles: metadataStyles });
    }

    /**
     * Log a debug message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    debug(message, metadata, metadataStyles) {
        return this.log(message, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles: metadataStyles });
    }

    /**
     * Log an info message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    info(message, metadata, metadataStyles) {
        return this.log(message, metadata, _nightingaleLevels2.default.INFO, { metadataStyles: metadataStyles });
    }

    /**
     * Log a warn message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    warn(message, metadata, metadataStyles) {
        return this.log(message, metadata, _nightingaleLevels2.default.WARN, { metadataStyles: metadataStyles });
    }

    /**
     * Log an error message
     *
     * @param {string|Error} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    error(message) {
        let metadata = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        let metadataStyles = arguments[2];

        if (message instanceof Error) {
            metadata.error = message;
            message = `${ metadata.error.name }: ${ metadata.error.message }`;
        }
        return this.log(message, metadata, _nightingaleLevels2.default.ERROR, { metadataStyles: metadataStyles });
    }

    /**
     * Log an alert message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    alert(message, metadata, metadataStyles) {
        return this.log(message, metadata, _nightingaleLevels2.default.ALERT, { metadataStyles: metadataStyles });
    }

    /**
     * Log a fatal message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    fatal(message, metadata, metadataStyles) {
        return this.log(message, metadata, _nightingaleLevels2.default.FATAL, { metadataStyles: metadataStyles });
    }

    /**
     * Log an inspected value
     *
     * @param {*} value
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    inspectValue(value, metadata, metadataStyles) {
        // Note: inspect is a special function for node:
        // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
        value = _util2.default.inspect(value, { depth: 6 });
        return this.log(value, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles: metadataStyles, styles: ['gray'] });
    }

    /**
     * Log a debugged var
     *
     * @param {string} varName
     * @param {*} varValue
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    inspectVar(varName, varValue, metadata, metadataStyles) {
        varValue = _util2.default.inspect(varValue, { depth: 6 });
        return this.log(`${ varName } = ${ varValue }`, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles: metadataStyles, styles: ['cyan'] });
    }

    /**
     * Alias for infoSuccess
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    success(message, metadata, metadataStyles) {
        return this.infoSuccess(message, metadata, metadataStyles);
    }

    /**
     * Log an info success message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    infoSuccess(message, metadata, metadataStyles) {
        return this.log(message, metadata, _nightingaleLevels2.default.INFO, {
            metadataStyles: metadataStyles,
            symbol: '✔',
            styles: ['green', 'bold']
        });
    }

    /**
     * Log an debug success message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    debugSuccess(message, metadata, metadataStyles) {
        return this.log(message, metadata, _nightingaleLevels2.default.DEBUG, {
            metadataStyles: metadataStyles,
            symbol: '✔',
            styles: ['green']
        });
    }

    /**
     * Alias for infoFail
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    fail(message, metadata, metadataStyles) {
        return this.infoSuccess(message, metadata, metadataStyles);
    }

    /**
     * Log an info fail message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    infoFail(message, metadata, metadataStyles) {
        return this.log(message, metadata, _nightingaleLevels2.default.INFO, {
            metadataStyles: metadataStyles,
            symbol: '✖',
            styles: ['red', 'bold']
        });
    }

    /**
     * Log an debug fail message
     *
     * @param {string} message
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    debugFail(message, metadata, metadataStyles) {
        return this.log(message, metadata, _nightingaleLevels2.default.DEBUG, {
            metadataStyles: metadataStyles,
            symbol: '✖',
            styles: ['red']
        });
    }

    /**
     * @returns {*} time to pass to timeEnd
     */
    time() {
        return Date.now();
    }

    /**
    * Finds difference between when this method
    * was called and when the respective time method
    * was called, then logs out the difference
    * and deletes the original record
    *
    * @param {number=} time return of previous call to time()
    * @param {string} [message]
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
    */
    timeEnd(time) {
        let message = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
        let metadata = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        let metadataStyles = arguments[3];

        const now = Date.now();

        const diffTime = now - time;
        const seconds = diffTime > 1000 && Math.floor(diffTime / 1000);
        const ms = diffTime - seconds * 1000;

        metadata.timeMs = diffTime;
        message = `${ message ? `${ message }: ` : '' }${ seconds ? `${ seconds }s and ` : '' }${ ms }ms`;
        this.log(message, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles: metadataStyles });
    }

    /**
     * Log an enter in a function
     *
     * @example
     * class A {
     *   method(arg1) {
     *     logger.enter(method, { arg1 });
     *     // Do your stuff
     *   }
     * }
     *
     * @param {Function} fn
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    enter(fn, metadata, metadataStyles) {
        return this.log(`enter ${ fn.name }`, metadata, _nightingaleLevels2.default.TRACE, { metadataStyles: metadataStyles });
    }

    /**
     * Log an exit in a function
     *
     * @example
     * const logger = new ConsoleLogger('myNamespace.A');
     * class A {
     *   method(arg1) {
     *     // Do your stuff
     *     logger.exit(method, { arg1 });
     *   }
     * }
     *
     *
     * @param {Function} fn
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @return {Logger}
    */
    exit(fn, metadata, metadataStyles) {
        return this.log(`exit ${ fn.name }`, metadata, _nightingaleLevels2.default.TRACE, { metadataStyles: metadataStyles });
    }

    /**
     * Wrap around a function to log enter and exit of a function
     *
     * @example
     * const logger = new ConsoleLogger('myNamespace.A');
     * class A {
     *   method() {
     *     logger.wrap(method, () => {
     *       // Do your stuff
     *     });
     *   }
     * }
     *
     * @param {Function} fn
     * @param {Object} [metadata]
     * @param {Object} [metadataStyles]
     * @param {Function} callback
    */
    wrap(fn, metadata, metadataStyles, callback) {
        if (typeof metadata === 'function') {
            callback = metadata;
            metadata = undefined;
        } else if (typeof metadataStyles === 'function') {
            callback = metadataStyles;
            metadataStyles = undefined;
        }

        this.enter(fn, metadata, metadataStyles);
        callback();
        this.exit(fn);
    }
};
exports.default = Logger;
//# sourceMappingURL=index.js.map