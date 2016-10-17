var _levels$TRACE$levels$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import levels from 'nightingale-levels';

export default (_levels$TRACE$levels$ = {}, _defineProperty(_levels$TRACE$levels$, levels.TRACE, ['gray']), _defineProperty(_levels$TRACE$levels$, levels.DEBUG, ['gray']), _defineProperty(_levels$TRACE$levels$, levels.WARN, ['yellow']), _defineProperty(_levels$TRACE$levels$, levels.ERROR, ['red', 'bold']), _defineProperty(_levels$TRACE$levels$, levels.CRITICAL, ['red', 'bold']), _defineProperty(_levels$TRACE$levels$, levels.FATAL, ['bgRed', 'white']), _defineProperty(_levels$TRACE$levels$, levels.EMERGENCY, ['bgRed', 'white']), _levels$TRACE$levels$);
//# sourceMappingURL=levelToStyles.js.map