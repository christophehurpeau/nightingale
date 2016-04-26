'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _levelToStyles;

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param obj
 * @param key
 * @param value
*/
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var levelToStyles = (_levelToStyles = {}, _defineProperty(_levelToStyles, _nightingaleLevels2.default.TRACE, ['gray']), _defineProperty(_levelToStyles, _nightingaleLevels2.default.DEBUG, ['gray']), _defineProperty(_levelToStyles, _nightingaleLevels2.default.WARN, ['orange']), _defineProperty(_levelToStyles, _nightingaleLevels2.default.ERROR, ['red', 'bold']), _defineProperty(_levelToStyles, _nightingaleLevels2.default.CRITICAL, ['red', 'bold']), _defineProperty(_levelToStyles, _nightingaleLevels2.default.FATAL, ['bgRed', 'white']), _defineProperty(_levelToStyles, _nightingaleLevels2.default.EMERGENCY, ['bgRed', 'white']), _levelToStyles);

exports.default = levelToStyles;
//# sourceMappingURL=levelToStyles.js.map