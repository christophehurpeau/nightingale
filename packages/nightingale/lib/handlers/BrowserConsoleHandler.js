'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Handler = require('../Handler');

var _Handler2 = _interopRequireDefault(_Handler);

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

const debugValues = (querystring => {
    let debugFromLocalStorage = global.localStorage && localStorage.DEBUG && localStorage.DEBUG || [];
    if (typeof debugFromLocalStorage === 'string') {
        debugFromLocalStorage = debugFromLocalStorage.split(',');
    }

    if (!querystring) {
        return debugFromLocalStorage;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
    return debugFromLocalStorage.concat(decodeURI(querystring.replace(new RegExp('^(?:.*[&\\?]' + 'DEBUG' + '(?:\\=([^&]*))?)?.*$', 'i'), '$1')).split(','));
})(location.search);

let BrowserConsoleHandler = class BrowserConsoleHandler extends _Handler2.default {
    /**
     * @param {int} minLevel see {@link LogLevel}
      * @param {string} [name] based on localStorage.DEBUG or querystring to determine the minimum level displayed
    */
    constructor(minLevel, name) {
        if (name) {
            let debug = debugValues[0] === '*' || debugValues.indexOf(name) !== -1;
            if (!debug && name.includes('.')) {
                debug = debugValues.indexOf(name.split('.')[0]) !== -1;
            }

            minLevel = debug ? _LogLevel2.default.ALL : minLevel || _LogLevel2.default.WARN;
        }

        super(minLevel, new _LayoutBrowserConsole2.default(formatterBrowserConsole), outputConsole);
    }
};
exports.default = BrowserConsoleHandler;
//# sourceMappingURL=BrowserConsoleHandler.js.map