'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _formatterANSI = require('./formatterANSI');

Object.defineProperty(exports, 'format', {
    enumerable: true,
    get: function get() {
        return _formatterANSI.format;
    }
});
exports.style = style;
function style(styles, string) {
    return string;
}
//# sourceMappingURL=formatterRaw.js.map