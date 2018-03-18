'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var formatterRaw = _interopDefault(require('nightingale-raw-formatter'));

/* eslint-disable prefer-template */

function index (minLevel) {
  var _this = this;

  this.minLevel = minLevel;
  this._buffer = '';
  this.handle = function (record) {
    _this._buffer += formatterRaw(record) + '\n';
  };
  Object.defineProperty(this, 'string', {
    get: function get() {
      return _this._buffer;
    }
  });
}

module.exports = index;
//# sourceMappingURL=index-node4.cjs.js.map
