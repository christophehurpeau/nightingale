import Level from 'nightingale-levels';

/* eslint-disable no-console */
const index = ((param, record) => {
  {
    const outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param}\n`);
  }
});

export default index;
//# sourceMappingURL=index-node10-dev.es.js.map
