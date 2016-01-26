'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _NodeLogger = require('./NodeLogger');

Object.defineProperty(exports, 'Logger', {
  enumerable: true,
  get: /**
        * @function
       */function get() {
    return _interopRequireDefault(_NodeLogger).default;
  }
});

var _ConsoleLogger = require('./ConsoleLogger');

Object.defineProperty(exports, 'ConsoleLogger', {
  enumerable: true,
  get: /**
        * @function
       */function get() {
    return _interopRequireDefault(_ConsoleLogger).default;
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
//# sourceMappingURL=node.js.map