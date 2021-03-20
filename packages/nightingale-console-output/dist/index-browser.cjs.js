'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Level = require('nightingale-levels');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var Level__default = /*#__PURE__*/_interopDefaultLegacy(Level);

/* eslint-disable no-console */
function consoleOutput(param, record) {
  console[record.level >= Level__default.ERROR ? 'error' : 'log'](...param);
}

exports.default = consoleOutput;
//# sourceMappingURL=index-browser.cjs.js.map
