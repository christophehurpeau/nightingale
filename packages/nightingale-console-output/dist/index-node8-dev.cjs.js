'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const Level = _interopDefault(require('nightingale-levels'));

/* eslint-disable no-console */
const index = ((param, record) => {
  {
    const outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param}\n`);
  }
});

exports.default = index;
//# sourceMappingURL=index-node8-dev.cjs.js.map
