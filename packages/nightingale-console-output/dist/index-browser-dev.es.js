import Level from 'nightingale-levels';

/* eslint-disable no-console */
var index = (function (param, record) {
  var _console;

  if (process.env.POB_TARGET !== 'browser') {
    var outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(param + "\n");
  } else {
    (_console = console)[record.level >= Level.ERROR ? 'error' : 'log'].apply(_console, param);
  }
});

export default index;
//# sourceMappingURL=index-browser-dev.es.js.map
