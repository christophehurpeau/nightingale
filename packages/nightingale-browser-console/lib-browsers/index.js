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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// debug string can change any time (localStorage), so we need a new object each time.
var findDebugLevel = function findDebugLevel(minLevel, key) {
  return (0, _nightingaleDebug2.default)((0, _debug2.default)())(minLevel, key);
};
var handle = function handle(record) {
  return (0, _nightingaleConsoleOutput2.default)((0, _nightingaleBrowserConsoleFormatter2.default)(record), record);
};

function BrowserConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
}
//# sourceMappingURL=index.js.map