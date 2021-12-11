'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const formatterRaw = require('nightingale-raw-formatter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const formatterRaw__default = /*#__PURE__*/_interopDefaultLegacy(formatterRaw);

/* eslint-disable prefer-template */
class StringHandler {
  _buffer = '';

  constructor(minLevel) {
    this.minLevel = minLevel;
  }

  get string() {
    return this._buffer;
  }

  handle(record) {
    this._buffer += formatterRaw__default(record) + '\n';
  }

}

exports.StringHandler = StringHandler;
//# sourceMappingURL=index-node14.cjs.js.map
