"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tcombForked = require("tcomb-forked");

var _tcombForked2 = _interopRequireDefault(_tcombForked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (handle) {
  _assert(handle, _tcombForked2.default.Function, "handle");

  return function (minLevel) {
    _assert(minLevel, _tcombForked2.default.Number, "minLevel");

    this.minLevel = minLevel;
    this.handle = handle;
  };
};

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