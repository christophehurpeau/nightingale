"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Logger = require("./index").Logger;

var ansi = require("ansi-styles");

var LoggerConsole = exports.LoggerConsole = (function (_Logger) {
    function LoggerConsole() {
        _classCallCheck(this, LoggerConsole);

        if (_Logger != null) {
            _Logger.apply(this, arguments);
        }
    }

    _inherits(LoggerConsole, _Logger);

    _createClass(LoggerConsole, {
        write: {
            value: function write(str, logLevel) {
                process[logLevel === "error" || logLevel === "fatal" ? "stderr" : "stdout"].write(str);
                return this;
            }
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
//# sourceMappingURL=console.js.map