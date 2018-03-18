'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var formatterANSI = _interopDefault(require('nightingale-ansi-formatter'));
var consoleOutput = _interopDefault(require('nightingale-console-output'));
var createFindDebugLevel = _interopDefault(require('nightingale-debug'));

const handle = record => consoleOutput(formatterANSI(record), record);
const findDebugLevel = createFindDebugLevel(process.env.DEBUG);

function ConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);
}

module.exports = ConsoleHandler;
//# sourceMappingURL=index-node6.cjs.js.map
