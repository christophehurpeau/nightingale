"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Logger = require("./index").Logger;

var htmlStyles = {
    //text style
    bold: "font-size: bold",
    italic: "font-style: italic",
    underline: "text-decoration: underline",
    inverse: "unicode-bidi: bidi-override; direction: rtl",
    strikethrough: "text-decoration: line-through",

    black: "color: black",
    red: "color: red",
    green: "color: green",
    yellow: "color: yellow",
    blue: "color: #4682B4",
    magenta: "color: magenta",
    cyan: "color: cyan",
    white: "color: white",
    gray: "color: gray",

    bgBlack: "background: black",
    bgRed: "background: red",
    bgGreen: "background: green",
    bgYellow: "background: yellow",
    bgBlue: "background: blue",
    bgMagenta: "background: magenta",
    bgCyan: "background: cyan",
    bgWhite: "background: white"

    //colors

};

var LoggerHtml = exports.LoggerHtml = (function (Logger) {
    function LoggerHtml() {
        _classCallCheck(this, LoggerHtml);

        _get(Object.getPrototypeOf(LoggerHtml.prototype), "constructor", this).call(this);
        this.html = "";
    }

    _inherits(LoggerHtml, Logger);

    _prototypeProperties(LoggerHtml, null, {
        write: {
            value: function write(html) {
                this.html += html;
                return this;
            },
            writable: true,
            configurable: true
        },
        nl: {
            value: function nl() {
                this.html += "<br/>";
                return this;
            },
            writable: true,
            configurable: true
        }
    });

    return LoggerHtml;
})(Logger);



LoggerHtml.style = function (styles, string) {
    if (!styles.length || !string) {
        return string;
    }
    return "<span style=\"" + styles.map(function (styleName) {
        return htmlStyles[styleName];
    }).join("; ") + "\">" + string + "</span>";
};
Logger._inject(LoggerHtml);
Object.defineProperty(exports, "__esModule", {
    value: true
});
//# sourceMappingURL=html.js.map