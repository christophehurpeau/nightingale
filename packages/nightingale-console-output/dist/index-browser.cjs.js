'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingaleLevels = require('nightingale-levels');

/* eslint-disable no-console */
function consoleOutput(param, record) {
  var _console;

  (_console = console)[record.level >= nightingaleLevels.Level.ERROR ? 'error' : 'log'].apply(_console, param);
}

exports['default'] = consoleOutput;
//# sourceMappingURL=index-browser.cjs.js.map
