import Level from 'nightingale-levels';

/* eslint-disable no-console */
var index = (function (param, record) {
  var _console;

  (_console = console)[record.level >= Level.ERROR ? 'error' : 'log'].apply(_console, param);
});

export default index;
//# sourceMappingURL=index-browser.es.js.map
