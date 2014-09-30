"use strict";
Object.defineProperties(exports, {
  Logger: {get: function() {
      return Logger;
    }},
  __esModule: {value: true}
});
var $__Object$defineProperty = Object.defineProperty;
var util = require('util');
var Logger = function() {
  "use strict";
  function Logger() {
    Object.getOwnPropertyNames(Logger.prototype).forEach(function(key) {
      if (key === 'constructor') {
        return;
      }
      this[key] = Logger.prototype[key].bind(this);
    }.bind(this));
  }
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
      this.now(undefined, logLevel);
      if (this._prefix) {
        this.write(this._prefix, logLevel);
      }
      return this;
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "now", {
    value: function(color, logLevel) {
      if (!color) {
        color = this.gray;
      }
      this.write(color.bold(new Date().toTimeString().split(' ')[0]) + ' ', logLevel);
      return this;
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "info", {
    value: function(message) {
      return this.log('→ ' + message);
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "warn", {
    value: function(message) {
      return this.log(this.yellow('⚠ ' + message));
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "error", {
    value: function(message) {
      return this.log(this.red.bold('✖ ' + (message.stack || message.message || message)), 'error');
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "alert", {
    value: function(message) {
      return this.log(this.red.bold('! ' + message));
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "fatal", {
    value: function(message) {
      return this.log(this.bgRed.white.bold('‼ ' + message), 'fatal');
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "debug", {
    value: function(message) {
      return this.log(this.gray('• ' + message));
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "inspect", {
    value: function(value) {
      value = util.inspect(value);
      return this.log(this.gray('• ' + value));
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "inspectVar", {
    value: function(varName, varValue) {
      varValue = util.inspect(varValue);
      return this.log(this.cyan('• ' + varName + ' = ' + varValue));
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "success", {
    value: function(message) {
      return this.log(this.green.bold('✔ ' + message));
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "time", {
    value: function(name) {
      if (name) {
        if (!this._timers) {
          this._timers = {};
        }
        this._timers[name] = Date.now();
      }
    },
    enumerable: false,
    writable: true
  });
  $__Object$defineProperty(Logger.prototype, "timeEnd", {
    value: function(name) {
      if (this._timers && this._timers[name]) {
        this.log(name + ': ' + (Date.now() - this._timers[name]) + 'ms');
        delete this._timers[name];
      }
    },
    enumerable: false,
    writable: true
  });
  return Logger;
}();
;
Logger._inject = function(object) {
  var styles = 'bold italic underline inverse strikethrough'.split(' ');
  var colors = 'black red green yellow blue magenta cyan white gray'.split(' ');
  var bgColors = 'bgBlack bgRed bgGreen bgYellow bgBlue bgMagenta bgCyan bgWhite bgGray'.split(' ');
  var injectStyle = function(target, styleNames) {
    styles.forEach(function(styleName) {
      var styleNames2 = styleNames.slice();
      styleNames2.push(styleName);
      target[styleName] = function(message) {
        return object.style(styleNames2, message);
      };
    });
  };
  injectStyle(object.prototype, []);
  var injectColor = function(target, styleNames) {
    colors.forEach(function(styleName) {
      var styleNames2 = styleNames.slice();
      styleNames2.push(styleName);
      target[styleName] = function(message) {
        return object.style(styleNames2, message);
      };
    });
  };
  injectColor(object.prototype, []);
  colors.forEach(function(styleName) {
    injectStyle(object.prototype[styleName], [styleName]);
  });
  bgColors.forEach(function(styleName) {
    object.prototype[styleName] = function(message) {
      return object.style([styleName], message);
    };
    injectColor(object.prototype[styleName], [styleName]);
    injectStyle(object.prototype[styleName], [styleName]);
    colors.forEach(function(styleNameColor) {
      injectStyle(object.prototype[styleName][styleNameColor], [styleName, styleNameColor]);
    });
  });
};

//# sourceMappingURL=index.js.map