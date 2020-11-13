import Level from 'nightingale-levels';

/* eslint-disable no-console */
function consoleOutput(param, record) {
  {
    const outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param}\n`);
  }
}

export default consoleOutput;
//# sourceMappingURL=index-node12.mjs.map
