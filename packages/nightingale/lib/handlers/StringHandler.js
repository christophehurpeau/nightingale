'use strict';

var _get = require('babel-runtime/helpers/get').default;

var _inherits = require('babel-runtime/helpers/inherits').default;

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Handler2 = require('../Handler');

var _Handler3 = _interopRequireDefault(_Handler2);

var _layoutsLayoutDefault = require('../layouts/LayoutDefault');

var _layoutsLayoutDefault2 = _interopRequireDefault(_layoutsLayoutDefault);

var _formattersFormatterRaw = require('../formatters/formatterRaw');

var formatterRaw = _interopRequireWildcard(_formattersFormatterRaw);

var _outputsOutputString = require('../outputs/OutputString');

var _outputsOutputString2 = _interopRequireDefault(_outputsOutputString);

/** @class StringHandler 
* @param minLevel */
let StringHandler = (function (_Handler) {
    _inherits(StringHandler, _Handler);

    /**
     * @param {int} minLevel
     */

    function StringHandler(minLevel) {
        _classCallCheck(this, StringHandler);

        _get(Object.getPrototypeOf(StringHandler.prototype), 'constructor', this).call(this, minLevel, new _layoutsLayoutDefault2.default(formatterRaw), new _outputsOutputString2.default());
    }

    _createClass(StringHandler, [{
        key: 'string',
        /** @memberof StringHandler 
        * @instance 
        * @member string */get: function get() {
            return this.output.string;
        }
    }]);

    return StringHandler;
})(_Handler3.default);

exports.default = StringHandler;
module.exports = exports.default;
//# sourceMappingURL=StringHandler.js.map