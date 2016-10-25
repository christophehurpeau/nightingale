import _t from 'tcomb-forked';
import browserConsoleFormatter from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';
import getDebugString from './debug';

// debug string can change any time (localStorage), so we need a new object each time.
var findDebugLevel = (minLevel, key) => createFindDebugLevel(getDebugString())(minLevel, key);
var handle = record => {
  _assert(record, _t.Object, 'record');

  return consoleOutput(browserConsoleFormatter(record), record);
};

export default function BrowserConsoleHandler(minLevel) {
  _assert(minLevel, _t.Number, 'minLevel');

  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);
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