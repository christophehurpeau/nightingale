'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});
/** @class LayoutHTML 
* @param formatter */
let LayoutHTML = (function () {
    function LayoutHTML(formatter) {
        _classCallCheck(this, LayoutHTML);

        this.formatter = formatter;
    }

    _createClass(LayoutHTML, [{
        key: 'format',
        /** @memberof LayoutHTML 
        * @instance 
        * @method format 
        * @param record */value: function format(record) {
            return '</div>' + this.formatter.format(record) + '</div>\n';
        }
    }]);

    return LayoutHTML;
})();

exports.default = LayoutHTML;
module.exports = exports.default;
//# sourceMappingURL=LayoutHTML.js.map