'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _LogLevel = require('./LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

var _alouette = require('alouette');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Interface that allows you to log records.
 * This records are treated by handlers
 */

var Logger = (function () {
    /**
     * Create a new Logger
     *
     * @param {Handler[]} handlers
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
     * @param {String} message
     * @param {String} logLevel
     * @return {Logger}
     */

    _createClass(Logger, [{
        key: 'write',
        value: function write(message, logLevel) {
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
        value: function addRecord(record) {
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
         * @param {String} message
         * @param {Object} context
         * @param {int} [logLevel]
         * @param {Object} [options]
         * @return {Logger}
         */

    }, {
        key: 'log',
        value: function log(message, context) {
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
         * @param {String} prefix
         * @param {*} [styles]
         */

    }, {
        key: 'setPrefix',
        value: function setPrefix(prefix, styles) {
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

    }, {
        key: 'debug',
        value: function debug(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.DEBUG, { contextStyles: contextStyles });
        }

        /**
         * Log an info message
         *
         * @param {String} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'info',
        value: function info(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.INFO, { contextStyles: contextStyles });
        }

        /**
         * Log an warn message
         *
         * @param {String} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'warn',
        value: function warn(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.WARN, { contextStyles: contextStyles });
        }

        /**
         * Log an error message
         *
         * @param {String|Error} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'error',
        value: function error(message, context, contextStyles) {
            if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) !== 'object') {
                message = message.message || message;
            } else {
                var parsedError = (0, _alouette.parse)(message);
                message = parsedError.toString();
            }
            return this.log(message, context, _LogLevel2.default.ERROR, { contextStyles: contextStyles });
        }

        /**
         * Log an alert message
         *
         * @param {String} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'alert',
        value: function alert(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.ALERT, { contextStyles: contextStyles });
        }

        /**
         * Log an fatal message
         *
         * @param {String} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'fatal',
        value: function fatal(message, context, contextStyles) {
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
        value: function inspectValue(value, context, contextStyles) {
            // Note: inspect is a special function for node:
            // https://github.com/nodejs/node/blob/a1bda1b4deb08dfb3e06cb778f0db40023b18318/lib/util.js#L210
            value = _util2.default.inspect(value, { depth: 6 });
            return this.log(value, context, _LogLevel2.default.DEBUG, { contextStyles: contextStyles, styles: ['gray'] });
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

    }, {
        key: 'inspectVar',
        value: function inspectVar(varName, varValue, context, contextStyles) {
            varValue = _util2.default.inspect(varValue, { depth: 6 });
            return this.log(varName + ' = ' + varValue, context, _LogLevel2.default.DEBUG, { contextStyles: contextStyles, styles: ['cyan'] });
        }

        /**
         * Log an sucess message
         *
         * @param {String} message
         * @param {Object} [context]
         * @param {Object} [contextStyles]
         * @return {Logger}
         */

    }, {
        key: 'success',
        value: function success(message, context, contextStyles) {
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
        value: function time(name) {
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

    }, {
        key: 'timeEnd',
        value: function timeEnd(time, name, context, contextStyles) {
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

            var message = (name ? name + ': ' : '') + (seconds ? seconds + 's and ' : '') + ms + 'ms';
            this.log(message, context, _LogLevel2.default.INFO, { contextStyles: contextStyles });
        }
    }]);

    return Logger;
})();

exports.default = Logger;
//# sourceMappingURL=Logger.js.map