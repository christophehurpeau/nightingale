'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
let OutputString = class OutputString {
    constructor() {
        this._buffer = '';
    }

    /**
     * @member string
    */get string() {
        return this._buffer;
    }

    /**
     * @param str
     * @param logLevel
    */write(str, logLevel) {
        this._buffer += str;
        return this;
    }
};
exports.default = OutputString;
//# sourceMappingURL=OutputString.js.map