'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var formatterANSI = _interopDefault(require('nightingale-ansi-formatter'));
var consoleOutput = _interopDefault(require('nightingale-console-output'));
var createFindDebugLevel = _interopDefault(require('nightingale-debug'));
var nightingaleTypes = require('nightingale-types');

const handle = record => consoleOutput(formatterANSI(record), record);

const findDebugLevel = createFindDebugLevel(process.env.DEBUG);
class ConsoleHandler {
  constructor(minLevel) {
    this.minLevel = nightingaleTypes.Level.ALL;
    this.isHandling = void 0;
    this.handle = void 0;

    this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);

    this.handle = handle;
  }

}

exports.default = ConsoleHandler;
//# sourceMappingURL=index-node6.cjs.js.map
