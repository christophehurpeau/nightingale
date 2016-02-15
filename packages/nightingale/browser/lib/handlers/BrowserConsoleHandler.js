'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Handler2 = require('../Handler');

var _Handler3 = _interopRequireDefault(_Handler2);

var _LogLevel = require('../LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

var _LayoutBrowserConsole = require('../layouts/LayoutBrowserConsole');

var _LayoutBrowserConsole2 = _interopRequireDefault(_LayoutBrowserConsole);

var _formatterBrowserConsole = require('../formatters/formatterBrowserConsole');

var formatterBrowserConsole = _interopRequireWildcard(_formatterBrowserConsole);

var _outputBrowserConsole = require('../outputs/outputBrowserConsole');

var outputConsole = _interopRequireWildcard(_outputBrowserConsole);

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

var debugValues = function (querystring) {
    var debugFromLocalStorage = global.localStorage && localStorage.DEBUG && localStorage.DEBUG || [];
    if (typeof debugFromLocalStorage === 'string') {
        debugFromLocalStorage = debugFromLocalStorage.split(',');
    }

    if (!querystring) {
        return debugFromLocalStorage;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
    return debugFromLocalStorage.concat(decodeURI(querystring.replace(new RegExp('^(?:.*[&\\?]' + 'DEBUG' + '(?:\\=([^&]*))?)?.*$', 'i'), '$1')).split(','));
}(location.search);

var BrowserConsoleHandler = /**
                             * @function
                             * @param _Handler
                            */function (_Handler) {
    _inherits(BrowserConsoleHandler, _Handler);

    /**
     * @param {int} minLevel see {@link LogLevel}
      * @param {string} [name] based on localStorage.DEBUG or querystring to determine the minimum level displayed
    * @function
    */

    function BrowserConsoleHandler(minLevel, name) {
        _classCallCheck(this, BrowserConsoleHandler);

        if (name) {
            var debug = debugValues[0] === '*' || debugValues.indexOf(name) !== -1;
            if (!debug && name.includes('.')) {
                debug = debugValues.indexOf(name.split('.')[0]) !== -1;
            }

            minLevel = debug ? _LogLevel2.default.ALL : minLevel || _LogLevel2.default.WARN;
        }

        return _possibleConstructorReturn(this, Object.getPrototypeOf(BrowserConsoleHandler).call(this, minLevel, new _LayoutBrowserConsole2.default(formatterBrowserConsole), outputConsole));
    }

    return BrowserConsoleHandler;
}(_Handler3.default);

exports.default = BrowserConsoleHandler;
//# sourceMappingURL=BrowserConsoleHandler.js.map