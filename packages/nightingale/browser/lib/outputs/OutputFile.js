'use strict';

var _createClass = /**
                    * @function
                   */ function () { /**
                                     * @function
                                     * @param target
                                     * @param props
                                    */ function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return (/**
                                                                                                                                                                                                                                                                                                                                                                            * @function
                                                                                                                                                                                                                                                                                                                                                                            * @param Constructor
                                                                                                                                                                                                                                                                                                                                                                            * @param protoProps
                                                                                                                                                                                                                                                                                                                                                                            * @param staticProps
                                                                                                                                                                                                                                                                                                                                                                           */ function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; } ); }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _fs = require('fs');

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OutputFile = /**
                  * @function
                 */function () {
    /**
     * @function
     * @param path
    */
    function OutputFile(path) {
        _classCallCheck(this, OutputFile);

        this._stream = (0, _fs.createWriteStream)(path);
    }

    _createClass(OutputFile, [{
        key: 'write',
        value: /**
                * @function
                * @param string
               */function write(string) {
            this._stream.write(string);
        }
    }]);

    return OutputFile;
}();

exports.default = OutputFile;
//# sourceMappingURL=OutputFile.js.map