'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _levels = require('./levels');

var _levels2 = _interopRequireDefault(_levels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstract class that handles a record.
 *
 * Has a min level to discard record lower that this level.
 */

var Handler = /**
               * @function
              */function () {
    /**
     * @param {int} minLevel
     * @param {Layout} layout
     * @param {Output} output
    * @function
    */

    function Handler(minLevel, layout, output) {
        var _this = this;

        _classCallCheck(this, Handler);

        this.minLevel = minLevel;
        this.layout = layout;
        this.output = output;

        _levels2.default.forEach(function (level) {
            if (level.value < minLevel) {
                _this[level.lcKey] = /**
                                      * @function
                                     */function () {};
            }
        });
    }

    /**
     * @param {Object} record
     */


    _createClass(Handler, [{
        key: 'handle',
        value: /**
                * @function
                * @param record
               */function handle(record) {
            if (record.level < this.minLevel) {
                return;
            }

            var formatted = this.layout.format(record);
            this.output.write(formatted);
        }
    }]);

    return Handler;
}();

exports.default = Handler;
//# sourceMappingURL=Handler.js.map