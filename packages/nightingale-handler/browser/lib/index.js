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

var _nightingaleDebug = require('nightingale-debug');

var _nightingaleDebug2 = _interopRequireDefault(_nightingaleDebug);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @param {int} minLevel
 * @param {Function} formatter
 * @param {Function} output
 */

var Handler = /**
               * @function
              */function () {
    /**
     * @function
     * @param minLevel
     * @param formatter
     * @param output
    */
    function Handler(minLevel, formatter, output) {
        _classCallCheck(this, Handler);

        this.minLevel = minLevel;
        this.format = formatter;
        this.write = output;
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
            var formatted = this.format(record);
            this.write(formatted, record);
        }
    }, {
        key: 'isHandling',
        value: /**
                * @function
                * @param level
                * @param key
               */function isHandling(level, key) {
            return level >= (0, _nightingaleDebug2.default)(this.minLevel, key);
        }
    }]);

    return Handler;
}();

exports.default = Handler;
//# sourceMappingURL=index.js.map