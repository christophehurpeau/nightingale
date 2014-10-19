"use strict";
var Logger = require('./index').Logger;

var htmlStyles = {
    //text style
    bold: 'font-size: bold',
    italic: 'font-style: italic',
    underline: 'text-decoration: underline',
    inverse: 'unicode-bidi: bidi-override; direction: rtl',
    strikethrough: 'text-decoration: line-through',

    black: 'color: black',
    red: 'color: red',
    green: 'color: green',
    yellow: 'color: yellow',
    blue: 'color: #4682B4',
    magenta: 'color: magenta',
    cyan: 'color: cyan',
    white: 'color: white',
    gray: 'color: gray',

    bgBlack: 'background: black',
    bgRed: 'background: red',
    bgGreen: 'background: green',
    bgYellow: 'background: yellow',
    bgBlue: 'background: blue',
    bgMagenta: 'background: magenta',
    bgCyan: 'background: cyan',
    bgWhite: 'background: white'

    //colors

};

var LoggerHtml = function(Logger) {
  var LoggerHtml = function LoggerHtml() {
      Logger.call(this);
      this.html = '';
  };

  LoggerHtml.prototype = Object.create(Logger.prototype, {
    constructor: {
      value: LoggerHtml,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  LoggerHtml.__proto__ = Logger;

  Object.defineProperties(LoggerHtml.prototype, {
    write: {
      writable: true,

      value: function(html) {
          this.html += html;
          return this;
      }
    },

    nl: {
      writable: true,

      value: function() {
          this.html += '<br/>';
          return this;
      }
    }
  });

  return LoggerHtml;
}(Logger);

exports.LoggerHtml = LoggerHtml;


LoggerHtml.style = function(styles, string) {
    if (!styles.length || !string) {
        return string;
    }
    return '<span style="' + styles.map(function(styleName) {
        return htmlStyles[styleName];
    }).join('; ') + '">' + string + '</span>';
};
Logger._inject(LoggerHtml);
//# sourceMappingURL=html.js.map