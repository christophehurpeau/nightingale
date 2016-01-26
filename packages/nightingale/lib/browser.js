'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Logger = require('./Logger');

Object.defineProperty(exports, 'Logger', {
  enumerable: true,
  get: /**
        * @function
       */function get() {
    return _interopRequireDefault(_Logger).default;
  }
});

var _BrowserConsoleLogger = require('./BrowserConsoleLogger');

Object.defineProperty(exports, 'ConsoleLogger', {
  enumerable: true,
  get: /**
        * @function
       */function get() {
    return _interopRequireDefault(_BrowserConsoleLogger).default;
  }
});

var _LogLevel = require('./LogLevel');

Object.defineProperty(exports, 'LogLevel', {
  enumerable: true,
  get: /**
        * @function
       */function get() {
    return _interopRequireDefault(_LogLevel).default;
  }
});
/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=browser.js.map