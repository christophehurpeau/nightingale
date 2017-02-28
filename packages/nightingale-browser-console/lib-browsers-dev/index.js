'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BrowserConsoleHandler;

var _nightingaleBrowserConsoleFormatter = require('nightingale-browser-console-formatter');

var _nightingaleBrowserConsoleFormatter2 = _interopRequireDefault(_nightingaleBrowserConsoleFormatter);

var _nightingaleConsoleOutput = require('nightingale-console-output');

var _nightingaleConsoleOutput2 = _interopRequireDefault(_nightingaleConsoleOutput);

var _nightingaleDebug = require('nightingale-debug');

var _nightingaleDebug2 = _interopRequireDefault(_nightingaleDebug);

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// debug string can change any time (localStorage), so we need a new object each time.
var findDebugLevel = function findDebugLevel(minLevel, key) {
  return (0, _nightingaleDebug2.default)((0, _debug2.default)())(minLevel, key);
};
var handle = function handle(record) {
  var _recordType = _flowRuntime2.default.object();

  _flowRuntime2.default.param('record', _recordType).assert(record);

  return (0, _nightingaleConsoleOutput2.default)((0, _nightingaleBrowserConsoleFormatter2.default)(record), record);
};

function BrowserConsoleHandler(minLevel) {
  var _minLevelType = _flowRuntime2.default.number();

  _flowRuntime2.default.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
}
//# sourceMappingURL=index.js.map