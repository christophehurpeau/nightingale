'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _fs = require('fs');

/** @class OutputFile 
* @param path */
let OutputFile = (function () {
    function OutputFile(path) {
        _classCallCheck(this, OutputFile);

        this._stream = (0, _fs.createWriteStream)(path);
    }

    _createClass(OutputFile, [{
        key: 'write',
        /** @memberof OutputFile 
        * @instance 
        * @method write 
        * @param string */value: function write(string) {
            this._stream.write(string);
        }
    }]);

    return OutputFile;
})();

exports.default = OutputFile;
module.exports = exports.default;
//# sourceMappingURL=OutputFile.js.map