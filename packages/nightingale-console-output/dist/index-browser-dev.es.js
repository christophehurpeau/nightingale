import Level from 'nightingale-levels';

/* eslint-disable no-console */
function consoleOutput(param, record) {
  var _console;

  (_console = console)[record.level >= Level.ERROR ? 'error' : 'log'].apply(_console, param);
}

export default consoleOutput;
//# sourceMappingURL=index-browser-dev.es.js.map
