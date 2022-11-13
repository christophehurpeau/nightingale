'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleLevels = require('nightingale-levels');

/* eslint-disable no-console */
function consoleOutput(param, record) {
  {
    const outKey = record.level >= nightingaleLevels.Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param}\n`);
  }
}

exports["default"] = consoleOutput;
//# sourceMappingURL=index-node16.cjs.map
