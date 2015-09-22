'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _LogLevel = require('./LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

const levels = _Object$keys(_LogLevel2.default).map(function (key) {
    return {
        key: key,
        lcKey: key.toLowerCase(),
        value: _LogLevel2.default[key]
    };
});

exports.default = levels;
module.exports = exports.default;
//# sourceMappingURL=levels.js.map