"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flowRuntime = require("flow-runtime");

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function index(handle) {
  let _handleType = _flowRuntime2.default.function();

  _flowRuntime2.default.param("handle", _handleType).assert(handle);

  return function (minLevel) {
    let _minLevelType = _flowRuntime2.default.number();

    _flowRuntime2.default.param("minLevel", _minLevelType).assert(minLevel);

    this.minLevel = minLevel;
    this.handle = handle;
  };
};
//# sourceMappingURL=index.js.map