'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ConsoleHandler;

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _nightingaleAnsiFormatter = require('nightingale-ansi-formatter');

var _nightingaleAnsiFormatter2 = _interopRequireDefault(_nightingaleAnsiFormatter);

var _nightingaleConsoleOutput = require('nightingale-console-output');

var _nightingaleConsoleOutput2 = _interopRequireDefault(_nightingaleConsoleOutput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handle = record => {
  _assert(record, _tcombForked2.default.Object, 'record');

  return (0, _nightingaleConsoleOutput2.default)((0, _nightingaleAnsiFormatter2.default)(record), record);
};

function ConsoleHandler(minLevel) {
  _assert(minLevel, _tcombForked2.default.Number, 'minLevel');

  this.minLevel = minLevel;
  this.handle = handle;
}

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