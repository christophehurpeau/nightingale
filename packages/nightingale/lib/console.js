"use strict";
var $__Object$defineProperty = Object.defineProperty;
var $__Object$create = Object.create;
var $__Object$getPrototypeOf = Object.getPrototypeOf;
var Logger = require('./index');
var ansi = require('ansi-styles');
var LoggerConsole = function($__super) {
  function LoggerConsole() {
    var $__0 = $__Object$getPrototypeOf(LoggerConsole.prototype);
    if ($__0 !== null)
      $__0.constructor.apply(this, arguments);
  }
  LoggerConsole.__proto__ = ($__super !== null ? $__super : Function.prototype);
  LoggerConsole.prototype = $__Object$create(($__super !== null ? $__super.prototype : null));
  $__Object$defineProperty(LoggerConsole.prototype, "constructor", {value: LoggerConsole});
  $__Object$defineProperty(LoggerConsole.prototype, "write", {
    value: function(str, logLevel) {
      process[logLevel === 'error' || logLevel === 'fatal' ? 'stderr' : 'stdout'].write(str);
      return this;
    },
    enumerable: false,
    writable: true
  });
  return LoggerConsole;
}(Logger);
module.exports = LoggerConsole;
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
