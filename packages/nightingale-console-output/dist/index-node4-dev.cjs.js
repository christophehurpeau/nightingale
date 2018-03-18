'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var levels = _interopDefault(require('nightingale-levels'));

var index = (function (string, _ref) {
  var level = _ref.level;

  var outKey = level >= levels.ERROR ? 'stderr' : 'stdout';
  process[outKey].write(`${string}\n`);
});

module.exports = index;
//# sourceMappingURL=index-node4-dev.cjs.js.map
