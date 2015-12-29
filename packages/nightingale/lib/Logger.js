'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _LogLevel = require('./LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */
let Logger = class Logger {
    /**
     * Create a new Logger
     *
     * @param {Handler[]} handlers
     */
    constructor(handlers) {
        this.handlers = handlers;

        Object.getOwnPropertyNames(Logger.prototype).forEach(key => {
            if (key === 'constructor') {
                return;
            }

            this[key] = Logger.prototype[key].bind(this);
        });
    }

    /**
     * Write a message
     *
     * @param {String} message
     * @param {String} logLevel
     * @return {Logger}
     */
    write(message, logLevel) {
        this.output.write(message, logLevel);
        return this;
    }

    /**
     * Handle a record
     *
     * Use this only if you know what you are doing.
     *
     * @param {Object} record
     */
    addRecord(record) {
        for (let i = 0, length = this.handlers.length; i < length; i++) {
            let handler = this.handlers[i];
            if (handler.handle(record) === false) {
                return;
            }
        }
    }

    /**
     * Log a message
     *
     * @param {String} message
     * @param {Object} context
     * @param {int} [logLevel]
     * @param {Object} [options]
     * @return {Logger}
     */
    log(message, context) {
        let logLevel = arguments.length <= 2 || arguments[2] === undefined ? _LogLevel2.default.INFO : arguments[2];
        let options = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

        let record = {
            level: logLevel,
            prefix: this._prefix,
            datetime: new Date(),
            message: message,
            context: context,
            extra: {}
        };

        if (options) {
            record = Object.assign(options, record);
        }

        this.addRecord(record);
        return this;
    }

    /**
     * Set the logger prefix
     *
     * @param {String} prefix
     * @param {*} [styles]
     */
    setPrefix(prefix, styles) {
        this._prefix = prefix;
    }

    /**
     * Log an debug message
     *
     * @param {String} message
     * @param {Object} [context]
     * @param {Object} [contextStyles]
     * @return {Logger}
     */
    debug(message, context, contextStyles) {
        return this.log(message, context, _LogLevel2.default.DEBUG, { contextStyles });
    }

    /**
     * Log an info message
     *
     * @param {String} message
     * @param {Object} [context]
     * @param {Object} [contextStyles]
     * @return {Logger}
     */
    info(message, context, contextStyles) {
        return this.log(message, context, _LogLevel2.default.INFO, { contextStyles });
    }

    /**
     * Log an warn message
     *
     * @param {String} message
     * @param {Object} [context]
     * @param {Object} [contextStyles]
     * @return {Logger}
     */
    warn(message, context, contextStyles) {
        return this.log(message, context, _LogLevel2.default.WARN, { contextStyles });
    }

    /**
     * Log an error message
     *
     * @param {String|Error} message
     * @param {Object} [context]
     * @param {Object} [contextStyles]
     * @return {Logger}
     */
    error(message, context, contextStyles) {
        message = message.stack || message.message || message;
        return this.log(message, context, _LogLevel2.default.ERROR, { contextStyles });
    }

    /**
     * Log an alert message
     *
     * @param {String} message
     * @param {Object} [context]
     * @param {Object} [contextStyles]
     * @return {Logger}
     */
    alert(message, context, contextStyles) {
        return this.log(message, context, _LogLevel2.default.ALERT, { contextStyles });
    }

    /**
     * Log an fatal message
     *
     * @param {String} message
     * @param {Object} [context]
     * @param {Object} [contextStyles]
     * @return {Logger}
     */
    fatal(message, context, contextStyles) {
        return this.log(message, context, _LogLevel2.default.FATAL, { contextStyles });
    }

    /**
     * Log an inspected value
     *
     * @param {*} value
     * @param {Object} [context]
     * @param {Object} [contextStyles]
     * @return {Logger}
     */
    inspectValue(value, context, contextStyles) {
        // Note: inspect is a special function for node:
        // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
        value = _util2.default.inspect(value, { depth: 6 });
        return this.log(value, context, _LogLevel2.default.DEBUG, { contextStyles, styles: ['gray'] });
    }

    /**
     * Log an debugged var
     *
     * @param {String} varName
     * @param {*} varValue
     * @param {Object} [context]
     * @param {Object} [contextStyles]
     * @return {Logger}
     */
    inspectVar(varName, varValue, context, contextStyles) {
        varValue = _util2.default.inspect(varValue, { depth: 6 });
        return this.log(varName + ' = ' + varValue, context, _LogLevel2.default.DEBUG, { contextStyles, styles: ['cyan'] });
    }

    /**
     * Log an sucess message
     *
     * @param {String} message
     * @param {Object} [context]
     * @param {Object} [contextStyles]
     * @return {Logger}
     */
    success(message, context, contextStyles) {
        return this.log(message, context, _LogLevel2.default.INFO, {
            contextStyles,
            symbol: '✔',
            styles: ['green', 'bold']
        });
    }

    /**
     * Stores current time in milliseconds
     * in the timers map
     *
     * @param {string} name timer name
     */
    time(name) {
        if (name) {
            if (!this._timers) {
                this._timers = {};
            }

            return this._timers[name] = Date.now();
        }

        return Date.now();
    }

    /**
    * Finds difference between when this method
    * was called and when the respective time method
    * was called, then logs out the difference
    * and deletes the original record
    *
    * @param {Number=} time return of previous call to time()
    * @param {string} name timer name
     * @param {Object} [context]
     * @param {Object} [contextStyles]
    */
    timeEnd(time, name, context, contextStyles) {
        const now = Date.now();

        if (typeof time !== 'number') {
            contextStyles = context;
            context = name;
            name = time;

            if (!this._timers || !this._timers[name]) {
                return;
            }

            time = this._timers[name];
            delete this._timers[name];
        }

        const diffTime = now - time;
        const seconds = diffTime > 1000 && Math.floor(diffTime / 1000);
        const ms = diffTime - seconds * 1000;

        const message = (name ? name + ': ' : '') + (seconds ? seconds + 's and ' : '') + ms + 'ms';
        this.log(message, context, _LogLevel2.default.INFO, { contextStyles });
    }
};
exports.default = Logger;
//# sourceMappingURL=Logger.js.map