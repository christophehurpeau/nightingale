import Level from 'nightingale-levels';

/* eslint-disable no-console */
var index = (function (param, record) {
  if (process.env.POB_TARGET !== 'browser') {
    const outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param}\n`);
  } else {
    console[record.level >= Level.ERROR ? 'error' : 'log'](...param);
  }
});

export default index;
//# sourceMappingURL=index-browsermodern-dev.es.js.map
