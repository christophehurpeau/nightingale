'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (minLevel) {
  this.minLevel = minLevel;
  this._buffer = '';
  this.handle = record => {
    this._buffer += (0, _nightingaleRawFormatter2.default)(record) + '\n';
  };
  Object.defineProperty(this, 'string', {
    get: () => this._buffer
  });
};

var _nightingaleRawFormatter = require('nightingale-raw-formatter');

var _nightingaleRawFormatter2 = _interopRequireDefault(_nightingaleRawFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map