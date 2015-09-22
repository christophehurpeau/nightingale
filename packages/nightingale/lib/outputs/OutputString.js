'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});
/** @class OutputString */
let OutputString = (function () {
    function OutputString() {
        _classCallCheck(this, OutputString);

        this._buffer = '';
    }

    _createClass(OutputString, [{
        key: 'write',
        /** @memberof OutputString 
        * @instance 
        * @method write 
        * @param str 
        * @param logLevel */value: function write(str, logLevel) {
            this._buffer += str;
            return this;
        }
    }, {
        key: 'string',
        /** @memberof OutputString 
        * @instance 
        * @member string */get: function get() {
            return this._buffer;
        }
    }]);

    return OutputString;
})();

exports.default = OutputString;
module.exports = exports.default;
//# sourceMappingURL=OutputString.js.map