"use strict";
var Logger = require('./index').Logger;

var ansi = require('ansi-styles');

var LoggerConsole = function(Logger) {
  var LoggerConsole = function LoggerConsole() {
    Logger.apply(this, arguments);
  };

  LoggerConsole.prototype = Object.create(Logger.prototype, {
    constructor: {
      value: LoggerConsole,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  LoggerConsole.__proto__ = Logger;

  Object.defineProperties(LoggerConsole.prototype, {
    write: {
      writable: true,

      value: function(str, logLevel) {
          process[ logLevel === 'error' || logLevel === 'fatal' ? 'stderr' : 'stdout' ].write(str);
          return this;
      }
    }
  });

  return LoggerConsole;
}(Logger);

exports.LoggerConsole = LoggerConsole;

LoggerConsole.style = function(styles, string) {
    if (!styles.length || !string) {
        return string;
    }
    return styles.reduce(function(string, styleName) {
        var style = ansi[styleName];
        return style.open + string + style.close;
    }, string);
};
Logger._inject(LoggerConsole);
//# sourceMappingURL=console.js.map