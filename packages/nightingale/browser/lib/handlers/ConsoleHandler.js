'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Handler2 = require('../Handler');

var _Handler3 = _interopRequireDefault(_Handler2);

var _LogLevel = require('../LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

var _LayoutDefault = require('../layouts/LayoutDefault');

var _LayoutDefault2 = _interopRequireDefault(_LayoutDefault);

var _formatterANSI = require('../formatters/formatterANSI');

var formatterANSI = _interopRequireWildcard(_formatterANSI);

var _outputConsole = require('../outputs/outputConsole');

var outputConsole = _interopRequireWildcard(_outputConsole);

/**
 * @function
 * @param obj
*/
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

var debugValues = process.env.DEBUG && process.env.DEBUG.split(',') || [];

var ConsoleHandler = /**
                      * @function
                      * @param _Handler
                     */function (_Handler) {
    _inherits(ConsoleHandler, _Handler);

    /**
     * @param {int} minLevel see {@link LogLevel}
     * @param {string} [name] based on process.env.DEBUG to determine the minimum level displayed
    * @function
    */

    function ConsoleHandler(minLevel, name) {
        _classCallCheck(this, ConsoleHandler);

        if (name) {
            var debug = debugValues[0] === '*' || debugValues.indexOf(name) !== -1;
            if (!debug && minLevel.includes('.')) {
                debug = debugValues.indexOf(minLevel.split('.')[0]) !== -1;
            }

            minLevel = debug ? _LogLevel2.default.ALL : minLevel || _LogLevel2.default.WARN;
        }

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ConsoleHandler).call(this, minLevel, new _LayoutDefault2.default(formatterANSI), outputConsole));
    }

    return ConsoleHandler;
}(_Handler3.default);

exports.default = ConsoleHandler;
//# sourceMappingURL=ConsoleHandler.js.map