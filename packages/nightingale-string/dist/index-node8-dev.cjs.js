'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var formatterRaw = _interopDefault(require('nightingale-raw-formatter'));
var t = _interopDefault(require('flow-runtime'));

/* eslint-disable prefer-template */
function index (minLevel) {
  let _minLevelType = t.number();

  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = minLevel;
  this._buffer = '';
  this.handle = record => {
    let _recordType = t.object();

    t.param('record', _recordType).assert(record);

    this._buffer += formatterRaw(record) + '\n';
  };
  Object.defineProperty(this, 'string', {
    get: () => this._buffer
  });
}

module.exports = index;
//# sourceMappingURL=index-node8-dev.cjs.js.map
