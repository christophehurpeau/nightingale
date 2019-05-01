'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const Level = _interopDefault(require('nightingale-levels'));

/* eslint-disable no-console */
function consoleOutput(param, record) {
  {
    const outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param}\n`);
  }
}

exports.default = consoleOutput;
//# sourceMappingURL=index-node10.cjs.js.map
