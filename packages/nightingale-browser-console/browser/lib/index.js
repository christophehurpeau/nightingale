'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _nightingaleHandler = require('nightingale-handler');

var _nightingaleHandler2 = _interopRequireDefault(_nightingaleHandler);

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

var _nightingaleBrowserConsoleFormatter = require('nightingale-browser-console-formatter');

var _nightingaleBrowserConsoleFormatter2 = _interopRequireDefault(_nightingaleBrowserConsoleFormatter);

var _nightingaleConsoleOutput = require('nightingale-console-output');

var _nightingaleConsoleOutput2 = _interopRequireDefault(_nightingaleConsoleOutput);

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

/**
 * @param {int} minLevel
 */

var BrowserConsoleHandler = /**
                             * @function
                             * @param _AbstractHandler
                            */function (_AbstractHandler) {
    _inherits(BrowserConsoleHandler, _AbstractHandler);

    /**
     * @function
     * @param minLevel
    */
    function BrowserConsoleHandler(minLevel) {
        _classCallCheck(this, BrowserConsoleHandler);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(BrowserConsoleHandler).call(this, minLevel, _nightingaleBrowserConsoleFormatter2.default, _nightingaleConsoleOutput2.default));
    }

    return BrowserConsoleHandler;
}(_nightingaleHandler2.default);

exports.default = BrowserConsoleHandler;
//# sourceMappingURL=index.js.map