'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const formatterANSI = _interopDefault(require('nightingale-ansi-formatter'));
const formatterJSON = _interopDefault(require('nightingale-json-formatter'));
const consoleOutput = _interopDefault(require('nightingale-console-output'));
const createFindDebugLevel = _interopDefault(require('nightingale-debug'));
const nightingaleTypes = require('nightingale-types');

const defaultFormatter = !process.stdout.isTTY && process.env.NIGHTINGALE_CONSOLE_FORMATTER !== 'ansi' ? formatterJSON : formatterANSI;

const createHandle = (formatter = defaultFormatter, output = consoleOutput) => {
  return record => {
    return output(formatter(record), record);
  };
};

const findDebugLevel = createFindDebugLevel(process.env.DEBUG);
class ConsoleHandler {
  constructor(minLevel, options = {}) {
    this.minLevel = nightingaleTypes.Level.ALL;
    this.minLevel = minLevel;

    this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);

    this.handle = createHandle(options.formatter, options.output);
  }

}

exports.default = ConsoleHandler;
//# sourceMappingURL=index-node8.cjs.js.map
