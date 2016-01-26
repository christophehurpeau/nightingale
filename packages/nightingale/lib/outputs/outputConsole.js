'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.write = write;

var _LogLevel = require('../LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param string
 * @param logLevel
*/function write(string, logLevel) {
    let outKey = logLevel >= _LogLevel2.default.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(string);
}
//# sourceMappingURL=outputConsole.js.map