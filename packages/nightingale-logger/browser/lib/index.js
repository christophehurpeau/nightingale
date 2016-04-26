'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

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

var Logger = /**
              * @function
             */function () {

    /**
     * Create a new Logger
     *
     * @param {string} key
     * @param {string} displayName
    * @function
    */

    function Logger(key, displayName) {
        _classCallCheck(this, Logger);

        this.key = key;
        this.displayName = displayName;
    }

    _createClass(Logger, [{
        key: 'getConfig',
        value: /**
                * @function
               */function getConfig() {
            return getConfigForLogger(this.key);
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
            var _getConfig = this.getConfig();

            var handlers = _getConfig.handlers;
            var processors = _getConfig.processors;

            handlers = handlers.filter(function (handler) {
                return handler.isHandling(record.level);
            });
            if (handlers.length === 0) {
                return;
            }

            if (processors) {
                processors.forEach(function (process) {
                    return process(record, record.context);
                });
            }

            handlers.some(function (handler) {
                return handler.handle(record) === false;
            });
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

    }, {
        key: 'log',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param level
                * @param options
               */function log(message, metadata) {
            var level = arguments.length <= 2 || arguments[2] === undefined ? _nightingaleLevels2.default.INFO : arguments[2];
            var options = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

            var context = metadata && metadata.context;
            if (metadata) {
                delete metadata.context;
            }

            var record = {
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

    }, {
        key: 'trace',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function trace(message, metadata, metadataStyles) {
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

    }, {
        key: 'debug',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function debug(message, metadata, metadataStyles) {
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

    }, {
        key: 'info',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function info(message, metadata, metadataStyles) {
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

    }, {
        key: 'warn',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function warn(message, metadata, metadataStyles) {
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

    }, {
        key: 'error',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function error(message) {
            var metadata = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var metadataStyles = arguments[2];

            if (message instanceof Error) {
                metadata.error = message;
                message = metadata.error.name + ': ' + metadata.error.message;
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

    }, {
        key: 'alert',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function alert(message, metadata, metadataStyles) {
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

    }, {
        key: 'fatal',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function fatal(message, metadata, metadataStyles) {
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

    }, {
        key: 'inspectValue',
        value: /**
                * @function
                * @param value
                * @param metadata
                * @param metadataStyles
               */function inspectValue(value, metadata, metadataStyles) {
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

    }, {
        key: 'inspectVar',
        value: /**
                * @function
                * @param varName
                * @param varValue
                * @param metadata
                * @param metadataStyles
               */function inspectVar(varName, varValue, metadata, metadataStyles) {
            varValue = _util2.default.inspect(varValue, { depth: 6 });
            return this.log(varName + ' = ' + varValue, metadata, _nightingaleLevels2.default.DEBUG, { metadataStyles: metadataStyles, styles: ['cyan'] });
        }

        /**
         * Alias for infoSuccess
         *
         * @param {string} message
         * @param {Object} [metadata]
         * @param {Object} [metadataStyles]
         * @return {Logger}
         */

    }, {
        key: 'success',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function success(message, metadata, metadataStyles) {
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

    }, {
        key: 'infoSuccess',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function infoSuccess(message, metadata, metadataStyles) {
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

    }, {
        key: 'debugSuccess',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function debugSuccess(message, metadata, metadataStyles) {
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

    }, {
        key: 'fail',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function fail(message, metadata, metadataStyles) {
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

    }, {
        key: 'infoFail',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function infoFail(message, metadata, metadataStyles) {
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

    }, {
        key: 'debugFail',
        value: /**
                * @function
                * @param message
                * @param metadata
                * @param metadataStyles
               */function debugFail(message, metadata, metadataStyles) {
            return this.log(message, metadata, _nightingaleLevels2.default.DEBUG, {
                metadataStyles: metadataStyles,
                symbol: '✖',
                styles: ['red']
            });
        }

        /**
         * @returns {*} time to pass to timeEnd
         */

    }, {
        key: 'time',
        value: /**
                * @function
               */function time() {
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

    }, {
        key: 'timeEnd',
        value: /**
                * @function
                * @param time
                * @param [message]
                * @param metadata
                * @param metadataStyles
               */function timeEnd(time) {
            var message = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
            var metadata = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            var metadataStyles = arguments[3];

            var now = Date.now();

            var diffTime = now - time;
            var seconds = diffTime > 1000 && Math.floor(diffTime / 1000);
            var ms = diffTime - seconds * 1000;

            metadata.timeMs = diffTime;
            message = '' + (message ? message + ': ' : '') + (seconds ? seconds + 's and ' : '') + ms + 'ms';
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

    }, {
        key: 'enter',
        value: /**
                * @function
                * @param fn
                * @param metadata
                * @param metadataStyles
               */function enter(fn, metadata, metadataStyles) {
            return this.log('enter ' + fn.name, metadata, _nightingaleLevels2.default.TRACE, { metadataStyles: metadataStyles });
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

    }, {
        key: 'exit',
        value: /**
                * @function
                * @param fn
                * @param metadata
                * @param metadataStyles
               */function exit(fn, metadata, metadataStyles) {
            return this.log('exit ' + fn.name, metadata, _nightingaleLevels2.default.TRACE, { metadataStyles: metadataStyles });
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

    }, {
        key: 'wrap',
        value: /**
                * @function
                * @param fn
                * @param metadata
                * @param metadataStyles
                * @param callback
               */function wrap(fn, metadata, metadataStyles, callback) {
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
    }]);

    return Logger;
}();

exports.default = Logger;
//# sourceMappingURL=index.js.map