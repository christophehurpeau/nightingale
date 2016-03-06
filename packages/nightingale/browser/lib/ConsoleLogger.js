'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Logger2 = require('./Logger');

var _Logger3 = _interopRequireDefault(_Logger2);

var _ConsoleHandler = require('./handlers/ConsoleHandler');

var _ConsoleHandler2 = _interopRequireDefault(_ConsoleHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param instance
 * @param Constructor
*/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @function
 * @param self
 * @param call
*/
function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

/**
 * @function
 * @param subClass
 * @param superClass
*/
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A simplified way of creating a {@link Logger} with a {@link ConsoleHandler}
 *
 *  Creates a new ConsoleLogger with a prefix.
 *
 * the min level is ALL if name is in `process.env.DEBUG`
 *
 * @param {string} name
 * @param {int} [defaultMinLevel] default is WARN
 */

var ConsoleLogger = /**
                     * @function
                     * @param _Logger
                    */function (_Logger) {
    _inherits(ConsoleLogger, _Logger);

    /**
     * @function
     * @param name
     * @param defaultMinLevel
    */
    function ConsoleLogger(name, defaultMinLevel) {
        _classCallCheck(this, ConsoleLogger);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConsoleLogger).call(this, [new _ConsoleHandler2.default(defaultMinLevel, name)]));

        if (name) {
            _this.setPrefix('[' + name + ']');
        }
        return _this;
    }

    return ConsoleLogger;
}(_Logger3.default);

exports.default = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map