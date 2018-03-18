'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var formatterANSI = _interopDefault(require('nightingale-ansi-formatter'));
var consoleOutput = _interopDefault(require('nightingale-console-output'));
var createFindDebugLevel = _interopDefault(require('nightingale-debug'));

var handle = function handle(record) {
  return consoleOutput(formatterANSI(record), record);
};
var findDebugLevel = createFindDebugLevel(process.env.DEBUG);

function ConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
}

module.exports = ConsoleHandler;
//# sourceMappingURL=index-node4.cjs.js.map
