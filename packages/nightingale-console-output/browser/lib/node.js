'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = write;

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

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
    var outKey = logLevel >= _nightingaleLevels2.default.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(string + '\n');
}
//# sourceMappingURL=node.js.map