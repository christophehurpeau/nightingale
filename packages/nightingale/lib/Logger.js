'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names').default;

var _Object$assign = require('babel-runtime/core-js/object/assign').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _LogLevel = require('./LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

/** @class Logger 
* @param handlers */
let Logger = (function () {
    function Logger(handlers) {
        var _this = this;

        _classCallCheck(this, Logger);

        this.handlers = handlers;

        _Object$getOwnPropertyNames(Logger.prototype).forEach(function (key) {
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
     
    * @memberof Logger 
    * @instance 
    * @method write 
    * @param message 
    * @param logLevel */

    _createClass(Logger, [{
        key: 'write',
        value: function write(message, logLevel) {
            this.output.write(message, logLevel);
            return this;
        }
    }, {
        key: 'addRecord',
        /** @memberof Logger 
        * @instance 
        * @method addRecord 
        * @param record */value: function addRecord(record) {
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
         * @param {int=} logLevel
         * @param {Object=} options
         * @return {Logger}
         
        * @memberof Logger 
        * @instance 
        * @method log 
        * @param message 
        * @param context 
        * @param [logLevel=undefined] 
        * @param [options=undefined] */
    }, {
        key: 'log',
        value: function log(message, context) {
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
                record = _Object$assign(options, record);
            }

            this.addRecord(record);
            return this;
        }

        /**
         * Set the logger prefix
         *
         * @param {String} prefix
         * @param {*} styles
         
        * @memberof Logger 
        * @instance 
        * @method setPrefix 
        * @param prefix 
        * @param styles */
    }, {
        key: 'setPrefix',
        value: function setPrefix(prefix, styles) {
            this._prefix = prefix;
        }

        /**
         * Log an debug message
         *
         * @param {String} message
         * @param {Object=} context
         * @param {Object=} contextStyles
         * @return {Logger}
         
        * @memberof Logger 
        * @instance 
        * @method debug 
        * @param message 
        * @param context 
        * @param contextStyles */
    }, {
        key: 'debug',
        value: function debug(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.DEBUG, { contextStyles });
        }

        /**
         * Log an info message
         *
         * @param {String} message
         * @param {Object=} context
         * @param {Object=} contextStyles
         * @return {Logger}
         
        * @memberof Logger 
        * @instance 
        * @method info 
        * @param message 
        * @param context 
        * @param contextStyles */
    }, {
        key: 'info',
        value: function info(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.INFO, { contextStyles });
        }

        /**
         * Log an warn message
         *
         * @param {String} message
         * @param {Object=} context
         * @param {Object=} contextStyles
         * @return {Logger}
         
        * @memberof Logger 
        * @instance 
        * @method warn 
        * @param message 
        * @param context 
        * @param contextStyles */
    }, {
        key: 'warn',
        value: function warn(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.WARN, { contextStyles });
        }

        /**
         * Log an error message
         *
         * @param {String|Error} message
         * @param {Object=} context
         * @param {Object=} contextStyles
         * @return {Logger}
         
        * @memberof Logger 
        * @instance 
        * @method error 
        * @param message 
        * @param context 
        * @param contextStyles */
    }, {
        key: 'error',
        value: function error(message, context, contextStyles) {
            return this.log(message.stack || message.message || message, context, _LogLevel2.default.ERROR, { contextStyles });
        }

        /**
         * Log an alert message
         *
         * @param {String} message
         * @param {Object=} context
         * @param {Object=} contextStyles
         * @return {Logger}
         
        * @memberof Logger 
        * @instance 
        * @method alert 
        * @param message 
        * @param context 
        * @param contextStyles */
    }, {
        key: 'alert',
        value: function alert(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.ALERT, { contextStyles });
        }

        /**
         * Log an fatal message
         *
         * @param {String} message
         * @param {Object=} context
         * @param {Object=} contextStyles
         * @return {Logger}
         
        * @memberof Logger 
        * @instance 
        * @method fatal 
        * @param message 
        * @param context 
        * @param contextStyles */
    }, {
        key: 'fatal',
        value: function fatal(message, context, contextStyles) {
            return this.log(message, context, _LogLevel2.default.FATAL, { contextStyles });
        }

        /**
         * Log an debug message
         *
         * @param {*} value
         * @param {Object=} context
         * @param {Object=} contextStyles
         * @return {Logger}
         
        * @memberof Logger 
        * @instance 
        * @method inspect 
        * @param value 
        * @param context 
        * @param contextStyles */
    }, {
        key: 'inspect',
        value: function inspect(value, context, contextStyles) {
            value = _util2.default.inspect(value, { depth: 6 });
            return this.log(value, context, _LogLevel2.default.DEBUG, { contextStyles, styles: ['gray'] });
        }

        /**
         * Log an debugged var
         *
         * @param {String} varName
         * @param {*} varValue
         * @param {Object=} context
         * @param {Object=} contextStyles
         * @return {Logger}
         
        * @memberof Logger 
        * @instance 
        * @method inspectVar 
        * @param varName 
        * @param varValue 
        * @param context 
        * @param contextStyles */
    }, {
        key: 'inspectVar',
        value: function inspectVar(varName, varValue, context, contextStyles) {
            varValue = _util2.default.inspect(varValue, { depth: 6 });
            return this.log(varName + ' = ' + varValue, context, _LogLevel2.default.DEBUG, { contextStyles, styles: ['cyan'] });
        }

        /**
         * Log an sucess message
         *
         * @param {String} message
         * @param {Object=} context
         * @param {Object=} contextStyles
         * @return {Logger}
         
        * @memberof Logger 
        * @instance 
        * @method success 
        * @param message 
        * @param context 
        * @param contextStyles */
    }, {
        key: 'success',
        value: function success(message, context, contextStyles) {
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
         
        * @memberof Logger 
        * @instance 
        * @method time 
        * @param name */
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
         * @param {Object=} context
         * @param {Object=} contextStyles
        
        * @memberof Logger 
        * @instance 
        * @method timeEnd 
        * @param time 
        * @param name 
        * @param context 
        * @param contextStyles */
    }, {
        key: 'timeEnd',
        value: function timeEnd(time, name, context, contextStyles) {
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
    }]);

    return Logger;
})();

exports.default = Logger;
module.exports = exports.default;
//# sourceMappingURL=Logger.js.map