'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var levels = _interopDefault(require('nightingale-levels'));

var index = ((string, { level }) => {
  const outKey = level >= levels.ERROR ? 'stderr' : 'stdout';
  process[outKey].write(`${string}\n`);
});

module.exports = index;
//# sourceMappingURL=index-node6-dev.cjs.js.map
