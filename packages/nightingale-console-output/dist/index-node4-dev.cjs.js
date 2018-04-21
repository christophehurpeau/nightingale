'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Level = _interopDefault(require('nightingale-levels'));

/* eslint-disable no-console */
var index = (function (param, record) {
  var _console;

  if (process.env.POB_TARGET !== 'browser') {
    var outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param}\n`);
  } else {
    (_console = console)[record.level >= Level.ERROR ? 'error' : 'log'].apply(_console, param);
  }
});

exports.default = index;
//# sourceMappingURL=index-node4-dev.cjs.js.map
