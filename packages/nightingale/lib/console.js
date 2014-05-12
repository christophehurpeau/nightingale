"use strict";
var __moduleName = "console";
var Logger = require('./index');
var LoggerConsole = Logger.extend();
module.exports = LoggerConsole;
var ansi = require('ansi-styles');
LoggerConsole.extendPrototype({write: function(str, logLevel) {
    process[logLevel === 'error' || logLevel === 'fatal' ? 'stderr' : 'stdout'].write(str);
    return this;
  }});
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
