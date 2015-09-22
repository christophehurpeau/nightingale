'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _levels = require('./levels');

var _levels2 = _interopRequireDefault(_levels);

/** @class Handler 
* @param minLevel 
* @param layout 
* @param output */
let Handler = (function () {
    /**
     * @param {int} minLevel
     * @param {Layout} layout
     * @param {Output} output
     */

    function Handler(minLevel, layout, output) {
        var _this = this;

        _classCallCheck(this, Handler);

        this.minLevel = minLevel;
        this.layout = layout;
        this.output = output;

        _levels2.default.forEach(function (level) {
            if (level.value < minLevel) {
                _this[level.lcKey] = /** @function */function () {};
            }
        });
    }

    /**
     * @param {Object} record
     
    * @memberof Handler 
    * @instance 
    * @method handle 
    * @param record */

    _createClass(Handler, [{
        key: 'handle',
        value: function handle(record) {
            if (record.value < this.minLevel) {
                return;
            }

            const formatted = this.layout.format(record);
            this.output.write(formatted);
        }
    }]);

    return Handler;
})();

exports.default = Handler;
module.exports = exports.default;
//# sourceMappingURL=Handler.js.map