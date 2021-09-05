import { Level } from 'nightingale-levels';

/* eslint-disable no-console */
function consoleOutput(param, record) {
  var _console;

  (_console = console)[record.level >= Level.ERROR ? 'error' : 'log'].apply(_console, param);
}

export { consoleOutput as default };
//# sourceMappingURL=index-browser.es.js.map
