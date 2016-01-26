'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.write = undefined;

var _LogLevel = require('../LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param arr
*/
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* eslint no-console: 0 */

var write = exports.write = function () {
    if (console.error) {
        return (/**
                * @function
                * @param params
                * @param logLevel
               */function write(params, logLevel) {
                var log = console[logLevel >= _LogLevel2.default.ERROR ? 'error' : 'log'].bind(console);
                log.apply(undefined, _toConsumableArray(params));
            }
        );
    } else {
        return (/**
                * @function
                * @param params
                * @param logLevel
               */function write(params, logLevel) {
                var log = console.log.bind(console);
                log.apply(undefined, _toConsumableArray(params));
            }
        );
    }
}();
//# sourceMappingURL=outputBrowserConsole.js.map