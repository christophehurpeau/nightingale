'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  [_nightingaleLevels2.default.TRACE]: ['gray'],
  [_nightingaleLevels2.default.DEBUG]: ['gray'],
  // [levels.INFO]: ['gray'],
  [_nightingaleLevels2.default.WARN]: ['yellow'],
  [_nightingaleLevels2.default.ERROR]: ['red', 'bold'],
  [_nightingaleLevels2.default.CRITICAL]: ['red', 'bold'],
  [_nightingaleLevels2.default.FATAL]: ['bgRed', 'white'],
  [_nightingaleLevels2.default.EMERGENCY]: ['bgRed', 'white']
};
//# sourceMappingURL=levelToStyles.js.map