"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (handle) {
  return function (minLevel) {
    this.minLevel = minLevel;
    this.handle = handle;
  };
};
//# sourceMappingURL=index.js.map