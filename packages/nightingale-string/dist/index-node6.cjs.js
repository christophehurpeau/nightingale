'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var formatterRaw = _interopDefault(require('nightingale-raw-formatter'));

/* eslint-disable prefer-template */

function index (minLevel) {
  this.minLevel = minLevel;
  this._buffer = '';
  this.handle = record => {
    this._buffer += formatterRaw(record) + '\n';
  };
  Object.defineProperty(this, 'string', {
    get: () => this._buffer
  });
}

module.exports = index;
//# sourceMappingURL=index-node6.cjs.js.map
