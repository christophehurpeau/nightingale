'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const formatterANSI = require('nightingale-ansi-formatter');
const consoleOutput = require('nightingale-console-output');
const nightingaleDebug = require('nightingale-debug');
const formatterJSON = require('nightingale-json-formatter');
const nightingaleLevels = require('nightingale-levels');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const formatterANSI__default = /*#__PURE__*/_interopDefaultLegacy(formatterANSI);
const consoleOutput__default = /*#__PURE__*/_interopDefaultLegacy(consoleOutput);
const formatterJSON__default = /*#__PURE__*/_interopDefaultLegacy(formatterJSON);

const defaultFormatter = !process.stdout.isTTY && process.env.NIGHTINGALE_CONSOLE_FORMATTER !== 'ansi' ? formatterJSON__default : formatterANSI__default;

const createHandle = (formatter = defaultFormatter, output = consoleOutput__default) => {
  return record => {
    output(formatter(record), record);
  };
};

const findDebugLevel = nightingaleDebug.createFindDebugLevel(process.env.DEBUG);
class ConsoleHandler {
  constructor(minLevel, options = {}) {
    this.minLevel = nightingaleLevels.Level.ALL;
    this.minLevel = minLevel;

    this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);

    this.handle = createHandle(options.formatter, options.output);
  }

}

exports.ConsoleHandler = ConsoleHandler;
exports["default"] = ConsoleHandler;
//# sourceMappingURL=index-node12-dev.cjs.js.map
