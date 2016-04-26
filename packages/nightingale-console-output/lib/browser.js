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

const write = (() => {
    if (console.error) {
        return (/**
                * @function
                * @param params
                * @param
               */function write(params, _ref) {
                let level = _ref.level;

                console[level >= _nightingaleLevels2.default.ERROR ? 'error' : 'log'](...params);
            }
        );
    } else {
        return (/**
                * @function
                * @param params
               */function write(params) {
                console.log(...params);
            }
        );
    }
})(); /* eslint no-console: 0 */


exports.default = write;
//# sourceMappingURL=browser.js.map