var _levelToStyles;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import levels from 'nightingale-levels';

var levelToStyles = (_levelToStyles = {}, _defineProperty(_levelToStyles, levels.TRACE, ['gray']), _defineProperty(_levelToStyles, levels.DEBUG, ['gray']), _defineProperty(_levelToStyles, levels.WARN, ['yellow']), _defineProperty(_levelToStyles, levels.ERROR, ['red', 'bold']), _defineProperty(_levelToStyles, levels.CRITICAL, ['red', 'bold']), _defineProperty(_levelToStyles, levels.FATAL, ['bgRed', 'white']), _defineProperty(_levelToStyles, levels.EMERGENCY, ['bgRed', 'white']), _levelToStyles);

export default levelToStyles;
//# sourceMappingURL=levelToStyles.js.map