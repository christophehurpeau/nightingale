'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ConsoleHandler;

var _nightingaleAnsiFormatter = require('nightingale-ansi-formatter');

var _nightingaleAnsiFormatter2 = _interopRequireDefault(_nightingaleAnsiFormatter);

var _nightingaleConsoleOutput = require('nightingale-console-output');

var _nightingaleConsoleOutput2 = _interopRequireDefault(_nightingaleConsoleOutput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handle = record => (0, _nightingaleConsoleOutput2.default)((0, _nightingaleAnsiFormatter2.default)(record), record);

function ConsoleHandler(minLevel) {
  this.minLevel = minLevel;
  this.handle = handle;
}
//# sourceMappingURL=index.js.map