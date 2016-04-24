'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Logger = require('./Logger');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: /**
        * @function
       */function get() {
    return _interopRequireDefault(_Logger).default;
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