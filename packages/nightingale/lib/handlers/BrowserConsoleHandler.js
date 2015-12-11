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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debugValues = (querystring => {
    if (!querystring) {
        return [];
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
    return decodeURI(querystring.replace(new RegExp('^(?:.*[&\\?]' + 'DEBUG' + '(?:\\=([^&]*))?)?.*$', 'i'), '$1')).split(',');
})(location.search);

let BrowserConsoleHandler = class BrowserConsoleHandler extends _Handler2.default {
    /**
     * @param {int|string} minLevel if int, see {@link LogLevel} ; if string, based on process.env.DEBUG
     */
    constructor(minLevel) {
        if (typeof minLevel === 'string') {
            let debug = debugValues[0] === '*' || debugValues.indexOf(minLevel) !== -1;
            if (!debug && minLevel.includes('.')) {
                debug = debugValues.indexOf(minLevel.split('.')[0]) !== -1;
            }

            minLevel = debug ? _LogLevel2.default.ALL : _LogLevel2.default.WARN;
        }

        super(minLevel, new _LayoutBrowserConsole2.default(formatterBrowserConsole), outputConsole);
    }
};
exports.default = BrowserConsoleHandler;
//# sourceMappingURL=BrowserConsoleHandler.js.map