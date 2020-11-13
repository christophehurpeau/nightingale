'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const Level = require('nightingale-levels');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const Level__default = /*#__PURE__*/_interopDefaultLegacy(Level);

/* eslint-disable no-console */
function consoleOutput(param, record) {
  {
    const outKey = record.level >= Level__default.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param}\n`);
  }
}

exports.default = consoleOutput;
//# sourceMappingURL=index-node12-dev.cjs.js.map
