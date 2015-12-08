'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class OutputString {
    constructor() {
        this._buffer = '';
    }

    get string() {
        return this._buffer;
    }

    write(str, logLevel) {
        this._buffer += str;
        return this;
    }
}
exports.default = OutputString;
//# sourceMappingURL=OutputString.js.map