'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

class OutputFile {
    constructor(path) {
        this._stream = (0, _fs.createWriteStream)(path);
    }

    write(string) {
        this._stream.write(string);
    }
}
exports.default = OutputFile;
//# sourceMappingURL=OutputFile.js.map