'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  [_nightingaleLevels2.default.TRACE]: '•',
  [_nightingaleLevels2.default.DEBUG]: '•',
  [_nightingaleLevels2.default.INFO]: '→',
  [_nightingaleLevels2.default.WARN]: '⚠',
  [_nightingaleLevels2.default.ERROR]: '✖',
  [_nightingaleLevels2.default.CRITICAL]: '!',
  [_nightingaleLevels2.default.FATAL]: '‼',
  [_nightingaleLevels2.default.EMERGENCY]: '‼'
};
//# sourceMappingURL=levelToSymbol.js.map