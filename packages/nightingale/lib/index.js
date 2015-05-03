"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

    _createClass(Logger, {
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
        },
        inspect: {

            /**
             * Log an debug message
             *
             * @param {*} value
             * @return {Logger}
             */

            value: function inspect(value) {
                value = util.inspect(value, { depth: 6 });
                return this.log(this.gray("• " + value));
            }
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
                varValue = util.inspect(varValue, { depth: 6 });
                return this.log(this.cyan("• " + varName + " = " + varValue));
            }
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
            }
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
            }
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
            }
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
//# sourceMappingURL=index.js.map