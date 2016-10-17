var _levels$TRACE$levels$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import levels from 'nightingale-levels';

export default (_levels$TRACE$levels$ = {}, _defineProperty(_levels$TRACE$levels$, levels.TRACE, '•'), _defineProperty(_levels$TRACE$levels$, levels.DEBUG, '•'), _defineProperty(_levels$TRACE$levels$, levels.INFO, '→'), _defineProperty(_levels$TRACE$levels$, levels.WARN, '⚠'), _defineProperty(_levels$TRACE$levels$, levels.ERROR, '✖'), _defineProperty(_levels$TRACE$levels$, levels.CRITICAL, '!'), _defineProperty(_levels$TRACE$levels$, levels.FATAL, '‼'), _defineProperty(_levels$TRACE$levels$, levels.EMERGENCY, '‼'), _levels$TRACE$levels$);
//# sourceMappingURL=levelToSymbol.js.map