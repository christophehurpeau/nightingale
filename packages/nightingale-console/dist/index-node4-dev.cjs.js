'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var formatterANSI = _interopDefault(require('nightingale-ansi-formatter'));
var consoleOutput = _interopDefault(require('nightingale-console-output'));
var createFindDebugLevel = _interopDefault(require('nightingale-debug'));
var t = _interopDefault(require('flow-runtime'));

var handle = function handle(record) {
  var _recordType = t.object();

  t.param('record', _recordType).assert(record);
  return consoleOutput(formatterANSI(record), record);
};
var findDebugLevel = createFindDebugLevel(process.env.DEBUG);

function ConsoleHandler(minLevel) {
  var _minLevelType = t.number();

  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
}

module.exports = ConsoleHandler;
//# sourceMappingURL=index-node4-dev.cjs.js.map
