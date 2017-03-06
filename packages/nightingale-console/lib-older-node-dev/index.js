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

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handle = function handle(record) {
  var _recordType = _flowRuntime2.default.object();

  _flowRuntime2.default.param('record', _recordType).assert(record);

  return (0, _nightingaleConsoleOutput2.default)((0, _nightingaleAnsiFormatter2.default)(record), record);
};
var findDebugLevel = (0, _nightingaleDebug2.default)(process.env.DEBUG);

function ConsoleHandler(minLevel) {
  var _minLevelType = _flowRuntime2.default.number();

  _flowRuntime2.default.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
}
//# sourceMappingURL=index.js.map