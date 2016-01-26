'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LogLevel = require('../LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const levelToStyles = {};
levelToStyles[_LogLevel2.default.TRACE] = ['gray'];
levelToStyles[_LogLevel2.default.DEBUG] = ['gray'];
// levelToStyles[LogLevel.INFO] = ['gray'];
levelToStyles[_LogLevel2.default.WARN] = ['yellow'];
levelToStyles[_LogLevel2.default.ERROR] = ['red', 'bold'];
levelToStyles[_LogLevel2.default.CRITICAL] = ['red', 'bold'];
levelToStyles[_LogLevel2.default.FATAL] = ['bgRed', 'white'];
levelToStyles[_LogLevel2.default.EMERGENCY] = ['bgRed', 'white'];

exports.default = levelToStyles;
//# sourceMappingURL=_levelToStyles.js.map