'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ConsoleHandler;

var _nightingaleAnsiFormatter = require('nightingale-ansi-formatter');

var _nightingaleAnsiFormatter2 = _interopRequireDefault(_nightingaleAnsiFormatter);

var _nightingaleConsoleOutput = require('nightingale-console-output');

var _nightingaleConsoleOutput2 = _interopRequireDefault(_nightingaleConsoleOutput);

var _nightingaleDebug = require('nightingale-debug');

var _nightingaleDebug2 = _interopRequireDefault(_nightingaleDebug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handle = function handle(record) {
  return (0, _nightingaleConsoleOutput2.default)((0, _nightingaleAnsiFormatter2.default)(record), record);
};
var findDebugLevel = (0, _nightingaleDebug2.default)(process.env.DEBUG);

function ConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
}
//# sourceMappingURL=index.js.map