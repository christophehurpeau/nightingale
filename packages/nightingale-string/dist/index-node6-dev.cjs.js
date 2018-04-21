'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var formatterRaw = _interopDefault(require('nightingale-raw-formatter'));

/* eslint-disable prefer-template */
class StringHandler {
  constructor(minLevel) {
    this.minLevel = void 0;
    this._buffer = '';
    this.minLevel = minLevel;
  }

  get string() {
    return this._buffer;
  }

  handle(record) {
    this._buffer += formatterRaw(record) + '\n';
  }

}

exports.default = StringHandler;
//# sourceMappingURL=index-node6-dev.cjs.js.map
