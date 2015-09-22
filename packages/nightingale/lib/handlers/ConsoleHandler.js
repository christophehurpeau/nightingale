'use strict';

var _get = require('babel-runtime/helpers/get').default;

var _inherits = require('babel-runtime/helpers/inherits').default;

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

var _formattersFormatterANSI = require('../formatters/formatterANSI');

var formatterANSI = _interopRequireWildcard(_formattersFormatterANSI);

var _outputsOutputConsole = require('../outputs/outputConsole');

var outputConsole = _interopRequireWildcard(_outputsOutputConsole);

/** @class ConsoleHandler 
* @param minLevel */
let ConsoleHandler = (function (_Handler) {
    _inherits(ConsoleHandler, _Handler);

    /**
     * @param {int} minLevel
     */

    function ConsoleHandler(minLevel) {
        _classCallCheck(this, ConsoleHandler);

        _get(Object.getPrototypeOf(ConsoleHandler.prototype), 'constructor', this).call(this, minLevel, new _layoutsLayoutDefault2.default(formatterANSI), outputConsole);
    }

    return ConsoleHandler;
})(_Handler3.default);

exports.default = ConsoleHandler;
module.exports = exports.default;
//# sourceMappingURL=ConsoleHandler.js.map