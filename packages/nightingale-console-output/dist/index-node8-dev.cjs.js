'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Level = _interopDefault(require('nightingale-levels'));

/* eslint-disable no-console */
var index = ((param, record) => {
  if (process.env.POB_TARGET !== 'browser') {
    const outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param}\n`);
  } else {
    console[record.level >= Level.ERROR ? 'error' : 'log'](...param);
  }
});

exports.default = index;
//# sourceMappingURL=index-node8-dev.cjs.js.map
