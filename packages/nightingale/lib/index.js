'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nightingaleLogger = require('nightingale-logger');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: /**
        * @function
       */function get() {
    return _interopRequireDefault(_nightingaleLogger).default;
  }
});

var _config = require('./config');

Object.defineProperty(exports, 'configure', {
  enumerable: true,
  get: /**
        * @function
       */function get() {
    return _config.configure;
  }
});
Object.defineProperty(exports, 'addGlobalProcessor', {
  enumerable: true,
  get: /**
        * @function
       */function get() {
    return _config.addGlobalProcessor;
  }
});
Object.defineProperty(exports, 'addGlobalHandler', {
  enumerable: true,
  get: /**
        * @function
       */function get() {
    return _config.addGlobalHandler;
  }
});

var _nightingaleLevels = require('nightingale-levels');

Object.defineProperty(exports, 'levels', {
  enumerable: true,
  get: /**
        * @function
       */function get() {
    return _interopRequireDefault(_nightingaleLevels).default;
  }
});
/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map