'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _level = require('./level');

var _level2 = _interopRequireDefault(_level);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findLevel = (0, _level2.default)(process.env.DEBUG);
exports.default = findLevel;
//# sourceMappingURL=node.js.map