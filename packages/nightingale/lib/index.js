/*#if NODE */
"use strict";
var util = require('util');

var Logger = function() {
  var Logger = function Logger() {
    var _this = this;
    Object.getOwnPropertyNames(Logger.prototype).forEach(function(key) {
        if (key === 'constructor') {
            return;
        }
        _this[key] = Logger.prototype[key].bind(_this);
    });
  };

  Object.defineProperties(Logger.prototype, {
    log: {
      writable: true,

      value: function(message, logLevel) {
          this.prefix(logLevel).write(message, logLevel).nl(logLevel);
      }
    },

    nl: {
      writable: true,

      value: function(logLevel) {
          this.write("\n", logLevel);
          return this;
      }
    },

    setPrefix: {
      writable: true,

      value: function(prefix, color) {
          if (!color) {
              color = this.gray;
          }
          this._prefix = color(prefix);
      }
    },

    prefix: {
      writable: true,

      value: function(logLevel) {
          this.now(undefined, logLevel);
          if (this._prefix) {
              this.write(this._prefix, logLevel);
          }
          return this;
      }
    },

    now: {
      writable: true,

      value: function(color, logLevel) {
          if (!color) {
              color = this.gray;
          }
          this.write(color.bold(new Date().toTimeString().split(' ')[0]
                                  /*new Date().toFormat('HH24:MI:SS')*/)+' ', logLevel);
          return this;
      }
    },

    info: {
      writable: true,

      value: function(message) {
          return this.log('→ ' + message);
      }
    },

    warn: {
      writable: true,

      value: function(message) {
          return this.log(this.yellow('⚠ ' + message));
      }
    },

    error: {
      writable: true,

      value: function(message) {
          return this.log(this.red.bold('✖ ' + (message.stack || message.message || message)), 'error');
      }
    },

    alert: {
      writable: true,

      value: function(message) {
          return this.log(this.red.bold('! ' + message));
      }
    },

    fatal: {
      writable: true,

      value: function(message) {
          return this.log(this.bgRed.white.bold('‼ ' + message), 'fatal');
      }
    },

    debug: {
      writable: true,

      value: function(message) {
          return this.log(this.gray('• ' + message));
      }
    },

    inspect: {
      writable: true,

      value: function(value) {
          value = util.inspect(value);
          return this.log(this.gray('• ' + value));
      }
    },

    inspectVar: {
      writable: true,

      value: function(varName, varValue) {
          varValue = util.inspect(varValue);
          return this.log(this.cyan('• ' + varName + ' = ' + varValue));
      }
    },

    success: {
      writable: true,

      value: function(message) {
          return this.log(this.green.bold('✔ ' + message));
      }
    },

    time: {
      writable: true,

      value: function(name) {
          if (name) {
              if (!this._timers) {
                  this._timers = {};
              }
              this._timers[name] = Date.now();
          }
      }
    },

    timeEnd: {
      writable: true,

      value: function(name) {
          if (this._timers && this._timers[name]) {
              this.log(name + ': ' + (Date.now() - this._timers[name]) + 'ms');
              delete this._timers[name];
          }
      }
    }
  });

  return Logger;
}();

exports.Logger = Logger;

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


// logger.black.bold('Hello');

//Logger.blue.bold('test');

//# sourceMappingURL=index.js.map