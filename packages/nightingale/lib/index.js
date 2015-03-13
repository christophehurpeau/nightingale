"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/*#if NODE */
var util = require("util");
/*#/if */

/**
 * Abstract Logger
 *
 * @class
 */
var Logger = exports.Logger = (function () {
    function Logger() {
        var _this = this;
        _classCallCheck(this, Logger);

        Object.getOwnPropertyNames(Logger.prototype).forEach(function (key) {
            if (key === "constructor") {
                return;
            }
            _this[key] = Logger.prototype[key].bind(_this);
        });
    }

    _prototypeProperties(Logger, null, {
        log: {

            /**
             * Log a message
             *
             * @param {String} message
             * @param {String} logLevel
             * @return {Logger}
             */
            value: function log(message, logLevel) {
                this.prefix(logLevel).write(message, logLevel).nl(logLevel);
            },
            writable: true,
            configurable: true
        },
        nl: {

            /**
             * Add a new line
             *
             * @param {String} logLevel
             * @return {Logger}
             */
            value: function nl(logLevel) {
                this.write("\n", logLevel);
                return this;
            },
            writable: true,
            configurable: true
        },
        setPrefix: {

            /**
             * Set the logger prefix
             *
             * @param {String} prefix
             * @return {Logger}
             */
            value: function setPrefix(prefix, color) {
                if (!color) {
                    color = this.gray;
                }
                this._prefix = color(prefix);
            },
            writable: true,
            configurable: true
        },
        prefix: {

            /**
             * Write the current prefix, if exists
             * @see setPrefix
             *
             * @param {String} logLevel
             * @return {Logger}
             */
            value: function prefix(logLevel) {
                this.now(undefined, logLevel);
                if (this._prefix) {
                    this.write(this._prefix, logLevel);
                }
                return this;
            },
            writable: true,
            configurable: true
        },
        now: {

            /**
             * Write the current time
             * @see setPrefix
             *
             * @param {Function} color
             * @return {Logger}
             */
            value: function now(color, logLevel) {
                if (!color) {
                    color = this.gray;
                }
                this.write(color.bold(new Date().toTimeString().split(" ")[0]
                /*new Date().toFormat('HH24:MI:SS')*/) + " ", logLevel);
                return this;
            },
            writable: true,
            configurable: true
        },
        info: {

            /**
             * Log an info message
             *
             * @param {String} message
             * @return {Logger}
             */
            value: function info(message) {
                return this.log("→ " + message);
            },
            writable: true,
            configurable: true
        },
        warn: {

            /**
             * Log an warn message
             *
             * @param {String} message
             * @return {Logger}
             */
            value: function warn(message) {
                return this.log(this.yellow("⚠ " + message));
            },
            writable: true,
            configurable: true
        },
        error: {

            /**
             * Log an error message
             *
             * @param {String|Error} message
             * @return {Logger}
             */
            value: function error(message) {
                return this.log(this.red.bold("✖ " + (message.stack || message.message || message)), "error");
            },
            writable: true,
            configurable: true
        },
        alert: {

            /**
             * Log an alert message
             *
             * @param {String} message
             * @return {Logger}
             */
            value: function alert(message) {
                return this.log(this.red.bold("! " + message));
            },
            writable: true,
            configurable: true
        },
        fatal: {

            /**
             * Log an fatal message
             *
             * @param {String} message
             * @return {Logger}
             */
            value: function fatal(message) {
                return this.log(this.bgRed.white.bold("‼ " + message), "fatal");
            },
            writable: true,
            configurable: true
        },
        debug: {

            /**
             * Log an debug message
             *
             * @param {String} message
             * @return {Logger}
             */
            value: function debug(message) {
                return this.log(this.gray("• " + message));
            },
            writable: true,
            configurable: true
        },
        inspect: {

            /**
             * Log an debug message
             *
             * @param {*} value
             * @return {Logger}
             */
            value: function inspect(value) {
                value = util.inspect(value);
                return this.log(this.gray("• " + value));
            },
            writable: true,
            configurable: true
        },
        inspectVar: {

            /**
             * Log an debugged var
             *
             * @param {String} message
             * @param {*} varValue
             * @return {Logger}
             */
            value: function inspectVar(varName, varValue) {
                varValue = util.inspect(varValue);
                return this.log(this.cyan("• " + varName + " = " + varValue));
            },
            writable: true,
            configurable: true
        },
        success: {

            /**
             * Log an sucess message
             *
             * @param {String} message
             * @return {Logger}
             */
            value: function success(message) {
                return this.log(this.green.bold("✔ " + message));
            },
            writable: true,
            configurable: true
        },
        time: {

            /**
             * Stores current time in milliseconds
             * in the timers map
             *
             * @param {string} name timer name
             */
            value: function time(name) {
                if (name) {
                    if (!this._timers) {
                        this._timers = {};
                    }
                    this._timers[name] = Date.now();
                }
            },
            writable: true,
            configurable: true
        },
        timeEnd: {

            /**
            * Finds difference between when this method
            * was called and when the respective time method
            * was called, then logs out the difference
            * and deletes the original record
            *
            * @param {string} name timer name
            */
            value: function timeEnd(name) {
                if (this._timers && this._timers[name]) {
                    this.log(name + ": " + (Date.now() - this._timers[name]) + "ms");
                    delete this._timers[name];
                }
            },
            writable: true,
            configurable: true
        }
    });

    return Logger;
})();


Logger._inject = function (object) {
    var styles = "bold italic underline inverse strikethrough".split(" ");
    var colors = "black red green yellow blue magenta cyan white gray".split(" ");
    var bgColors = "bgBlack bgRed bgGreen bgYellow bgBlue bgMagenta bgCyan bgWhite bgGray".split(" ");

    var injectStyle = function (target, styleNames) {
        styles.forEach(function (styleName) {
            var styleNames2 = styleNames.slice();
            styleNames2.push(styleName);
            target[styleName] = function (message) {
                return object.style(styleNames2, message);
            };
        });
    };
    injectStyle(object.prototype, []);

    var injectColor = function (target, styleNames) {
        colors.forEach(function (styleName) {
            var styleNames2 = styleNames.slice();
            styleNames2.push(styleName);
            target[styleName] = function (message) {
                return object.style(styleNames2, message);
            };
        });
    };

    injectColor(object.prototype, []);
    colors.forEach(function (styleName) {
        injectStyle(object.prototype[styleName], [styleName]);
    });

    bgColors.forEach(function (styleName) {
        object.prototype[styleName] = function (message) {
            return object.style([styleName], message);
        };
        injectColor(object.prototype[styleName], [styleName]);
        injectStyle(object.prototype[styleName], [styleName]);
        colors.forEach(function (styleNameColor) {
            injectStyle(object.prototype[styleName][styleNameColor], [styleName, styleNameColor]);
        });
    });
};


// logger.black.bold('Hello');

//Logger.blue.bold('test');
Object.defineProperty(exports, "__esModule", {
    value: true
});
//# sourceMappingURL=index.js.map