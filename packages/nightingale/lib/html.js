"use strict";
Object.defineProperties(exports, {
  LoggerHtml: {get: function() {
      return LoggerHtml;
    }},
  __esModule: {value: true}
});
var $__Object$getPrototypeOf = Object.getPrototypeOf;
var $__Object$defineProperty = Object.defineProperty;
var $__Object$create = Object.create;
var Logger = require('./index').Logger;
var htmlStyles = {
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
};
var LoggerHtml = function($__super) {
  "use strict";
  function LoggerHtml() {
    $__Object$getPrototypeOf(LoggerHtml.prototype).constructor.call(this);
    this.html = '';
  }
  LoggerHtml.__proto__ = ($__super !== null ? $__super : Function.prototype);
  LoggerHtml.prototype = $__Object$create(($__super !== null ? $__super.prototype : null));
  $__Object$defineProperty(LoggerHtml.prototype, "constructor", {value: LoggerHtml});
  $__Object$defineProperty(LoggerHtml.prototype, "write", {
    value: function(html) {
      this.html += html;
      return this;
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(LoggerHtml.prototype, "nl", {
    value: function() {
      this.html += '<br/>';
      return this;
    },
    enumerable: false,
    writable: true
  });
  return LoggerHtml;
}(Logger);
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