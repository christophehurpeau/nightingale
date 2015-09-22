'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});
/** @class LayoutDefault 
* @param formatter */
let LayoutDefault = (function () {
    function LayoutDefault(formatter) {
        _classCallCheck(this, LayoutDefault);

        this.formatter = formatter;
    }

    _createClass(LayoutDefault, [{
        key: 'format',
        /** @memberof LayoutDefault 
        * @instance 
        * @method format 
        * @param record */value: function format(record) {
            return this.formatter.format(record) + '\n';
        }
    }]);

    return LayoutDefault;
})();

exports.default = LayoutDefault;
module.exports = exports.default;
//# sourceMappingURL=LayoutDefault.js.map