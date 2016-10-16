import _t from 'tcomb-forked';
import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';

var handle = function handle(record) {
  _assert(record, _t.Object, 'record');

  return consoleOutput(formatterANSI(record), record);
};

export default function ConsoleHandler(minLevel) {
  _assert(minLevel, _t.Number, 'minLevel');

  this.minLevel = minLevel;
  this.handle = handle;
}

function _assert(x, type, name) {
  function message() {
    return 'Invalid value ' + _t.stringify(x) + ' supplied to ' + name + ' (expected a ' + _t.getTypeName(type) + ')';
  }

  if (_t.isType(type)) {
    if (!type.is(x)) {
      type(x, [name + ': ' + _t.getTypeName(type)]);

      _t.fail(message());
    }
  } else if (!(x instanceof type)) {
    _t.fail(message());
  }

  return x;
}
//# sourceMappingURL=index.js.map