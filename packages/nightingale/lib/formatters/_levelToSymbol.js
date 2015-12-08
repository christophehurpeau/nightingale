'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LogLevel = require('../LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const levelToSymbol = {};
levelToSymbol[_LogLevel2.default.TRACE] = '•';
levelToSymbol[_LogLevel2.default.DEBUG] = '•';
levelToSymbol[_LogLevel2.default.INFO] = '→';
levelToSymbol[_LogLevel2.default.WARN] = '⚠';
levelToSymbol[_LogLevel2.default.ERROR] = '✖';
levelToSymbol[_LogLevel2.default.CRITICAL] = '!';
levelToSymbol[_LogLevel2.default.FATAL] = '‼';
levelToSymbol[_LogLevel2.default.EMERGENCY] = '‼';

exports.default = levelToSymbol;
//# sourceMappingURL=_levelToSymbol.js.map