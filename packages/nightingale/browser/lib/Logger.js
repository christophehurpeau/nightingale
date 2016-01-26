'use strict';

var _createClass = /**
                    * @function
                   */ function () { /**
                                     * @function
                                     * @param target
                                     * @param props
                                    */ function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return (/**
                                                                                                                                                                                                                                                                                                                                                                            * @function
                                                                                                                                                                                                                                                                                                                                                                            * @param Constructor
                                                                                                                                                                                                                                                                                                                                                                            * @param protoProps
                                                                                                                                                                                                                                                                                                                                                                            * @param staticProps
                                                                                                                                                                                                                                                                                                                                                                           */ function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; } ); }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _LogLevel = require('./LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */

var Logger = /**
              * @function
             */function () {
    /**
     * Create a new Logger
     *
     * @param {Handler[]} handlers
    * @function
    */

    function Logger(handlers) {
        var _this = this;

        _classCallCheck(this, Logger);

        this.handlers = handlers;

        Object.getOwnPropertyNames(Logger.prototype).forEach(function (key) {
            if (key === 'constructor') {
                return;
            }

            _this[key] = Logger.prototype[key].bind(_this);
        });
    }

    /**
     * Write a message
     *
     * @param {string} message
     * @param {string} logLevel
     * @return {Logger}
     */

    _createClass(Logger, [{
        key: 'write',
        value: /**
                * @function
                * @param message
                * @param logLevel
               */function write(message, logLevel) {
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

    }, {
        key: 'addRecord',
        value: /**
                * @function
                * @param record
               */function addRecord(record) {
            for (var i = 0, length = this.handlers.length; i < length; i++) {
                var handler = this.handlers[i];
                if (handler.handle(record) === false) {
                    return;
                }
            }
        }

        /**
         * Log a message
         *
         * @param {string} message
         * @param {Object} context
         * @param {int} [logLevel]
         * @param {Object} [options]
         * @return {Logger}
         */

    }, {
        key: 'log',
        value: /**
                * @function
                * @param message
                * @param context
                * @param logLevel
                * @param options
               */function log(message, context) {
            var logLevel = arguments.length <= 2 || arguments[2] === undefined ? _LogLevel2.default.INFO : arguments[2];
            var options = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

            var record = {
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
         * @param {string} prefix
         * @param {*} [styles]
         */

    }, {
        key: 'setPrefix',
        value: /**
                * @function
                * @param prefix
                * @param styles
               */function setPrefix(prefix, styles) {
            this._prefix = prefix;
        }

        /**
         * Log an debug message
         *
         * @param {string} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'debug',
        value: /**
                * @function
                * @param message
                * @param context
                * @param contextStyles
               */function debug(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.DEBUG, { contextStyles: contextStyles });
        }

        /**
         * Log an info message
         *
         * @param {string} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'info',
        value: /**
                * @function
                * @param message
                * @param context
                * @param contextStyles
               */function info(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.INFO, { contextStyles: contextStyles });
        }

        /**
         * Log an warn message
         *
         * @param {string} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'warn',
        value: /**
                * @function
                * @param message
                * @param context
                * @param contextStyles
               */function warn(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.WARN, { contextStyles: contextStyles });
        }

        /**
         * Log an error message
         *
         * @param {string|Error} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'error',
        value: /**
                * @function
                * @param message
                * @param context
                * @param contextStyles
               */function error(message, context, contextStyles) {
            message = message.stack || message.message || message;
            return this.log(message, context, _LogLevel2.default.ERROR, { contextStyles: contextStyles });
        }

        /**
         * Log an alert message
         *
         * @param {string} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'alert',
        value: /**
                * @function
                * @param message
                * @param context
                * @param contextStyles
               */function alert(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.ALERT, { contextStyles: contextStyles });
        }

        /**
         * Log an fatal message
         *
         * @param {string} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'fatal',
        value: /**
                * @function
                * @param message
                * @param context
                * @param contextStyles
               */function fatal(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.FATAL, { contextStyles: contextStyles });
        }

        /**
         * Log an inspected value
         *
         * @param {*} value
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'inspectValue',
        value: /**
                * @function
                * @param value
                * @param context
                * @param contextStyles
               */function inspectValue(value, context, contextStyles) {
            // Note: inspect is a special function for node:
            // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
            value = _util2.default.inspect(value, { depth: 6 });
            return this.log(value, context, _LogLevel2.default.DEBUG, { contextStyles: contextStyles, styles: ['gray'] });
        }

        /**
         * Log an debugged var
         *
         * @param {string} varName
         * @param {*} varValue
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'inspectVar',
        value: /**
                * @function
                * @param varName
                * @param varValue
                * @param context
                * @param contextStyles
               */function inspectVar(varName, varValue, context, contextStyles) {
            varValue = _util2.default.inspect(varValue, { depth: 6 });
            return this.log(varName + ' = ' + varValue, context, _LogLevel2.default.DEBUG, { contextStyles: contextStyles, styles: ['cyan'] });
        }

        /**
         * Log an sucess message
         *
         * @param {string} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'success',
        value: /**
                * @function
                * @param message
                * @param context
                * @param contextStyles
               */function success(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.INFO, {
                contextStyles: contextStyles,
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

    }, {
        key: 'time',
        value: /**
                * @function
                * @param name
               */function time(name) {
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
        * @param {number=} time return of previous call to time()
        * @param {string} name timer name
         * @param {Object} [context]
         * @param {Object} [contextStyles]
        */

    }, {
        key: 'timeEnd',
        value: /**
                * @function
                * @param time
                * @param name
                * @param context
                * @param contextStyles
               */function timeEnd(time, name, context, contextStyles) {
            var now = Date.now();

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

            var diffTime = now - time;
            var seconds = diffTime > 1000 && Math.floor(diffTime / 1000);
            var ms = diffTime - seconds * 1000;

            var message = '' + (name ? name + ': ' : '') + (seconds ? seconds + 's and ' : '') + ms + 'ms';
            this.log(message, context, _LogLevel2.default.INFO, { contextStyles: contextStyles });
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
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'enter',
        value: /**
                * @function
                * @param fn
                * @param context
                * @param contextStyles
               */function enter(fn, context, contextStyles) {
            return this.log('enter ' + fn.name, context, _LogLevel2.default.DEBUG, { contextStyles: contextStyles });
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
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'exit',
        value: /**
                * @function
                * @param fn
                * @param context
                * @param contextStyles
               */function exit(fn, context, contextStyles) {
            return this.log('exit ' + fn.name, context, _LogLevel2.default.DEBUG, { contextStyles: contextStyles });
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
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @param {Function} callback
         */

    }, {
        key: 'wrap',
        value: /**
                * @function
                * @param fn
                * @param context
                * @param contextStyles
                * @param callback
               */function wrap(fn, context, contextStyles, callback) {
            if (typeof context === 'function') {
                callback = context;
                context = undefined;
            } else if (typeof contextStyles === 'function') {
                callback = contextStyles;
                contextStyles = undefined;
            }

            this.enter(fn, context, contextStyles);
            callback();
            this.exit(fn);
        }
    }]);

    return Logger;
}();

exports.default = Logger;
//# sourceMappingURL=Logger.js.map