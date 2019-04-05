import Level from 'nightingale-levels';

/* eslint-disable no-console */
const index = (function (param, record) {
  console[record.level >= Level.ERROR ? 'error' : 'log'](...param);
});

export default index;
//# sourceMappingURL=index-browsermodern.es.js.map
