"use strict";
var $__Object$defineProperty = Object.defineProperty;
var util = require('util');
var Logger = function() {
  function Logger() {}
  $__Object$defineProperty(Logger.prototype, "log", {
    value: function(message, logLevel) {
      this.prefix(logLevel).write(message, logLevel).nl(logLevel);
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "nl", {
    value: function(logLevel) {
      this.write("\n", logLevel);
      return this;
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "setPrefix", {
    value: function(prefix, color) {
      if (!color) {
        color = this.gray;
      }
      this._prefix = color(prefix);
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "prefix", {
    value: function(logLevel) {
      this.time(logLevel);
      if (this._prefix) {
        this.write(this._prefix, logLevel);
      }
      return this;
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "time", {
    value: function(color) {
      if (!color) {
        color = this.gray;
      }
      this.write(color.bold(new Date().toTimeString().split(' ')[0]) + ' ');
      return this;
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "info", {
    value: function(message) {
      return this.log('[info ] ' + message);
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "warn", {
    value: function(message) {
      return this.log(this.red('[warn ] ' + message));
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "error", {
    value: function(message) {
      return this.log(this.red.bold('[error] ' + (message.stack || message.message || message)), 'error');
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "fatal", {
    value: function(message) {
      return this.log(this.red.bold('[fatal] ' + message), 'fatal');
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "debug", {
    value: function(message) {
      return this.log(this.gray('[debug] ' + message));
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "inspect", {
    value: function(value) {
      value = util.inspect(value);
      return this.log(this.gray('[debug] ' + value));
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "inspectVar", {
    value: function(varName, varValue) {
      varValue = util.inspect(varValue);
      return this.log(this.cyan('[debug] ' + varName + ' = ' + varValue));
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "alert", {
    value: function(message) {
      return this.log(this.purple.bold('[alert] ' + message));
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "success", {
    value: function(message) {
      return this.log(this.green.bold('[success] ' + message));
    },
    enumerable: false,
    writable: true
  });
  return Logger;
}();
module.exports = Logger;
Logger._inject = function(object) {
  var injectStyle1 = function(prototype, styleName2) {
    'bold italic underline inverse strikethrough'.split(' ').forEach(function(styleName) {
      prototype[styleName] = function(message) {
        return object.style([styleName, styleName2], message);
      };
    });
  };
  injectStyle1(object.prototype);
  'black red green yellow blue magenta cyan white gray'.split(' ').forEach(function(styleName) {
    object.prototype[styleName] = function(message) {
      return object.style([styleName], message);
    };
    injectStyle1(object.prototype[styleName], styleName);
  });
};
