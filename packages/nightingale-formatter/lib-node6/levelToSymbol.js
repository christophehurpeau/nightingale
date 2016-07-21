'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const levelToSymbol = {};
levelToSymbol[_nightingaleLevels2.default.TRACE] = '•';
levelToSymbol[_nightingaleLevels2.default.DEBUG] = '•';
levelToSymbol[_nightingaleLevels2.default.INFO] = '→';
levelToSymbol[_nightingaleLevels2.default.WARN] = '⚠';
levelToSymbol[_nightingaleLevels2.default.ERROR] = '✖';
levelToSymbol[_nightingaleLevels2.default.CRITICAL] = '!';
levelToSymbol[_nightingaleLevels2.default.FATAL] = '‼';
levelToSymbol[_nightingaleLevels2.default.EMERGENCY] = '‼';

exports.default = levelToSymbol;
//# sourceMappingURL=levelToSymbol.js.map