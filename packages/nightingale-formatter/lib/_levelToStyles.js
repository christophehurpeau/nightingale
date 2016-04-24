'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const levelToStyles = {};
levelToStyles[_nightingaleLevels2.default.TRACE] = ['gray'];
levelToStyles[_nightingaleLevels2.default.DEBUG] = ['gray'];
// levelToStyles[levels.INFO] = ['gray'];
levelToStyles[_nightingaleLevels2.default.WARN] = ['orange'];
levelToStyles[_nightingaleLevels2.default.ERROR] = ['red', 'bold'];
levelToStyles[_nightingaleLevels2.default.CRITICAL] = ['red', 'bold'];
levelToStyles[_nightingaleLevels2.default.FATAL] = ['bgRed', 'white'];
levelToStyles[_nightingaleLevels2.default.EMERGENCY] = ['bgRed', 'white'];

exports.default = levelToStyles;
//# sourceMappingURL=_levelToStyles.js.map