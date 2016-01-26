'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _fs = require('fs');

let OutputFile = class OutputFile {
    /**
     * @param path
    */
    constructor(path) {
        this._stream = (0, _fs.createWriteStream)(path);
    }

    /**
     * @param string
    */write(string) {
        this._stream.write(string);
    }
};
exports.default = OutputFile;
//# sourceMappingURL=OutputFile.js.map