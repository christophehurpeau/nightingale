'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (minLevel) {
  _assert(minLevel, _tcombForked2.default.Number, 'minLevel');

  this.minLevel = minLevel;
  this._buffer = '';
  this.handle = record => {
    _assert(record, _tcombForked2.default.Object, 'record');

    this._buffer += (0, _nightingaleRawFormatter2.default)(record) + '\n';
  };
  Object.defineProperty(this, 'string', {
    get: () => this._buffer
  });
};

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _nightingaleRawFormatter = require('nightingale-raw-formatter');

var _nightingaleRawFormatter2 = _interopRequireDefault(_nightingaleRawFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-template */
function _assert(x, type, name) {
  function message() {
    return 'Invalid value ' + _tcombForked2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcombForked2.default.getTypeName(type) + ')';
  }

  if (_tcombForked2.default.isType(type)) {
    if (!type.is(x)) {
      type(x, [name + ': ' + _tcombForked2.default.getTypeName(type)]);

      _tcombForked2.default.fail(message());
    }
  } else if (!(x instanceof type)) {
    _tcombForked2.default.fail(message());
  }

  return x;
}
//# sourceMappingURL=index.js.map