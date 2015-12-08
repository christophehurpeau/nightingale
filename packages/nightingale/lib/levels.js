'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _LogLevel = require('./LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const levels = Object.keys(_LogLevel2.default).map(key => {
    return {
        key: key,
        lcKey: key.toLowerCase(),
        value: _LogLevel2.default[key]
    };
});

exports.default = levels;
//# sourceMappingURL=levels.js.map