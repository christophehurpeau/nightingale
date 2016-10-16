'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BrowserConsoleHandler;

var _nightingaleBrowserConsoleFormatter = require('nightingale-browser-console-formatter');

var _nightingaleBrowserConsoleFormatter2 = _interopRequireDefault(_nightingaleBrowserConsoleFormatter);

var _nightingaleConsoleOutput = require('nightingale-console-output');

var _nightingaleConsoleOutput2 = _interopRequireDefault(_nightingaleConsoleOutput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handle = function handle(record) {
  return (0, _nightingaleConsoleOutput2.default)((0, _nightingaleBrowserConsoleFormatter2.default)(record), record);
};

function BrowserConsoleHandler(minLevel) {
  this.minLevel = minLevel;
  this.handle = handle;
}
//# sourceMappingURL=index.js.map