import Level from 'nightingale-levels';

/* eslint-disable no-console */
function consoleOutput(param, record) {
  console[record.level >= Level.ERROR ? 'error' : 'log'](...param);
}

export default consoleOutput;
//# sourceMappingURL=index-browser.es.js.map
