"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Logger = require("./index").Logger;

var ansi = require("ansi-styles");

var LoggerConsole = exports.LoggerConsole = (function (Logger) {
    function LoggerConsole() {
        _classCallCheck(this, LoggerConsole);

        if (Logger != null) {
            Logger.apply(this, arguments);
        }
    }

    _inherits(LoggerConsole, Logger);

    _prototypeProperties(LoggerConsole, null, {
        write: {
            value: function write(str, logLevel) {
                process[logLevel === "error" || logLevel === "fatal" ? "stderr" : "stdout"].write(str);
                return this;
            },
            writable: true,
            configurable: true
        }
    });

    return LoggerConsole;
})(Logger);


LoggerConsole.style = function (styles, string) {
    if (!styles.length || !string) {
        return string;
    }
    return styles.reduce(function (string, styleName) {
        var style = ansi[styleName];
        return style.open + string + style.close;
    }, string);
};
Logger._inject(LoggerConsole);
Object.defineProperty(exports, "__esModule", {
    value: true
});
//# sourceMappingURL=console.js.map