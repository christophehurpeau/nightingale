'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Level = _interopDefault(require('nightingale-levels'));

/* eslint-disable no-console */
function consoleOutput(param, record) {
  var _console;

  (_console = console)[record.level >= Level.ERROR ? 'error' : 'log'].apply(_console, param);
}

exports.default = consoleOutput;
//# sourceMappingURL=index-browser-dev.cjs.js.map
