'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = undefined;

var _nightingale = require('nightingale');

Object.keys(_nightingale).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _nightingale[key];
    }
  });
});

var _nightingale2 = _interopRequireDefault(_nightingale);

var _nightingaleConsole = require('nightingale-console');

var _nightingaleConsole2 = _interopRequireDefault(_nightingaleConsole);

var _nightingaleErrorProcessor = require('nightingale-error-processor');

var _nightingaleErrorProcessor2 = _interopRequireDefault(_nightingaleErrorProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = exports.logger = new _nightingale2.default('app');

(0, _nightingale.listenUnhandledErrors)(logger);

(0, _nightingale.configure)([{
  processors: [_nightingaleErrorProcessor2.default]
}, false, {
  handlers: [new _nightingaleConsole2.default(_nightingale.levels.INFO)]
}].filter(Boolean));
//# sourceMappingURL=index.js.map