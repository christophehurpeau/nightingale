"use strict";
var __moduleName = "index";
var S = require('springbokjs-utils');
var util = require('util');
var Logger = S.newClass();
module.exports = Logger;
Logger.extendPrototype({
  log: function(message, logLevel) {
    this.prefix(logLevel).write(message, logLevel).nl(logLevel);
  },
  nl: function(logLevel) {
    this.write("\n", logLevel);
    return this;
  },
  setPrefix: function(prefix, color) {
    if (!color) {
      color = this.gray;
    }
    this._prefix = color(prefix);
  },
  writable: {prefix: function(logLevel) {
      this.time(logLevel);
      if (this._prefix) {
        this.write(this._prefix, logLevel);
      }
      return this;
    }},
  time: function(color) {
    if (!color) {
      color = this.gray;
    }
    this.write(color.bold(new Date().toTimeString().split(' ')[0]) + ' ');
    return this;
  },
  info: function(message) {
    return this.log('[info ] ' + message);
  },
  warn: function(message) {
    return this.log(this.red('[warn ] ' + message));
  },
  error: function(message) {
    return this.log(this.red.bold('[error] ' + message), 'error');
  },
  fatal: function(message) {
    return this.log(this.red.bold('[fatal] ' + message), 'fatal');
  },
  debug: function(message) {
    return this.log(this.gray('[debug] ' + message));
  },
  inspect: function(value) {
    value = util.inspect(value);
    return this.log(this.gray('[debug] ' + value));
  },
  inspectVar: function(varName, varValue) {
    varValue = util.inspect(varValue);
    return this.log(this.cyan('[debug] ' + varName + ' = ' + varValue));
  },
  alert: function(message) {
    return this.log(this.purple.bold('[alert] ' + message));
  },
  success: function(message) {
    return this.log(this.green.bold('[success] ' + message));
  }
});
Logger._inject = (function(object) {
  var injectStyle1 = (function(prototype, styleName2) {
    'bold italic underline inverse strikethrough'.split(' ').forEach((function(styleName) {
      prototype[styleName] = (function(message) {
        return object.style([styleName, styleName2], message);
      });
    }));
  });
  injectStyle1(object.prototype);
  'black red green yellow blue magenta cyan white gray'.split(' ').forEach((function(styleName) {
    object.prototype[styleName] = (function(message) {
      return object.style([styleName], message);
    });
    injectStyle1(object.prototype[styleName], styleName);
  }));
});
