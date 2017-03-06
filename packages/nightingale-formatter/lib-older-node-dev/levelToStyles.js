'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _levels$TRACE$levels$;

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_levels$TRACE$levels$ = {}, _defineProperty(_levels$TRACE$levels$, _nightingaleLevels2.default.TRACE, ['gray']), _defineProperty(_levels$TRACE$levels$, _nightingaleLevels2.default.DEBUG, ['gray']), _defineProperty(_levels$TRACE$levels$, _nightingaleLevels2.default.WARN, ['yellow']), _defineProperty(_levels$TRACE$levels$, _nightingaleLevels2.default.ERROR, ['red', 'bold']), _defineProperty(_levels$TRACE$levels$, _nightingaleLevels2.default.CRITICAL, ['red', 'bold']), _defineProperty(_levels$TRACE$levels$, _nightingaleLevels2.default.FATAL, ['bgRed', 'white']), _defineProperty(_levels$TRACE$levels$, _nightingaleLevels2.default.EMERGENCY, ['bgRed', 'white']), _levels$TRACE$levels$);
//# sourceMappingURL=levelToStyles.js.map