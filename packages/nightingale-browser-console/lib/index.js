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
 * @param {int} minLevel
 */
let BrowserConsoleHandler = class BrowserConsoleHandler extends _nightingaleHandler2.default {
    /**
     * @param minLevel
    */
    constructor(minLevel) {
        super(minLevel, _nightingaleBrowserConsoleFormatter2.default, _nightingaleConsoleOutput2.default);
    }
};
exports.default = BrowserConsoleHandler;
//# sourceMappingURL=index.js.map