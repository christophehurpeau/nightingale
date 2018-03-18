'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var formatterRaw = _interopDefault(require('nightingale-raw-formatter'));
var t = _interopDefault(require('flow-runtime'));

/* eslint-disable prefer-template */
function index (minLevel) {
  var _this = this;

  var _minLevelType = t.number();

  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = minLevel;
  this._buffer = '';
  this.handle = function (record) {
    var _recordType = t.object();

    t.param('record', _recordType).assert(record);

    _this._buffer += formatterRaw(record) + '\n';
  };
  Object.defineProperty(this, 'string', {
    get: function get() {
      return _this._buffer;
    }
  });
}

module.exports = index;
//# sourceMappingURL=index-node4-dev.cjs.js.map
