'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const formatterANSI = _interopDefault(require('nightingale-ansi-formatter'));
const consoleOutput = _interopDefault(require('nightingale-console-output'));
const createFindDebugLevel = _interopDefault(require('nightingale-debug'));
const nightingaleTypes = require('nightingale-types');

const handle = record => consoleOutput(formatterANSI(record), record);

const findDebugLevel = createFindDebugLevel(process.env.DEBUG);
class ConsoleHandler {
  constructor(minLevel) {
    this.minLevel = nightingaleTypes.Level.ALL;
    this.minLevel = minLevel;

    this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);

    this.handle = handle;
  }

}

exports.default = ConsoleHandler;
//# sourceMappingURL=index-node8.cjs.js.map
