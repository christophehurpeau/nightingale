'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = level;

var _minimatch = require('minimatch');

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param debugValue
*/function level(debugValue) {
    debugValue = debugValue || '';

    if (!Array.isArray(debugValue)) {
        debugValue = debugValue.trim().split(',');
    }

    if (debugValue.length === 0) {
        return function () {
            var minLevel = arguments.length <= 0 || arguments[0] === undefined ? _nightingaleLevels2.default.INFO : arguments[0];
            return minLevel;
        };
    }

    if (debugValue.some(function (value) {
        return value === '*';
    })) {
        return function (minLevel) {
            return _nightingaleLevels2.default.ALL;
        };
    }

    var minimatchPatterns = debugValue.map(function (pattern) {
        return new _minimatch.Minimatch(pattern);
    });

    return function () {
        var minLevel = arguments.length <= 0 || arguments[0] === undefined ? _nightingaleLevels2.default.INFO : arguments[0];
        var key = arguments[1];

        if (minLevel <= _nightingaleLevels2.default.TRACE || !key) {
            return minLevel;
        }

        return minimatchPatterns.some(function (p) {
            return p.match(key);
        }) ? _nightingaleLevels2.default.ALL : minLevel;
    };
}
//# sourceMappingURL=level.js.map