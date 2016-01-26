'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Handler = require('../Handler');

var _Handler2 = _interopRequireDefault(_Handler);

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

const debugValues = process.env.DEBUG && process.env.DEBUG.split(',') || [];

let ConsoleHandler = class ConsoleHandler extends _Handler2.default {
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

        super(minLevel, new _LayoutDefault2.default(formatterANSI), outputConsole);
    }
};
exports.default = ConsoleHandler;
//# sourceMappingURL=ConsoleHandler.js.map