'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _nightingaleHandler = require('nightingale-handler');

var _nightingaleHandler2 = _interopRequireDefault(_nightingaleHandler);

var _nightingaleAnsiFormatter = require('nightingale-ansi-formatter');

var _nightingaleAnsiFormatter2 = _interopRequireDefault(_nightingaleAnsiFormatter);

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
let ConsoleHandler = class ConsoleHandler extends _nightingaleHandler2.default {
    /**
     * @param minLevel
    */
    constructor(minLevel) {
        super(minLevel, _nightingaleAnsiFormatter2.default, _nightingaleConsoleOutput2.default);
    }
};
exports.default = ConsoleHandler;
//# sourceMappingURL=index.js.map