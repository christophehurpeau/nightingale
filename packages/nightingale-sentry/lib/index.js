'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _nightingaleHandler = require('nightingale-handler');

var _nightingaleHandler2 = _interopRequireDefault(_nightingaleHandler);

var _nightingaleSentryOutput = require('nightingale-sentry-output');

var _nightingaleSentryOutput2 = _interopRequireDefault(_nightingaleSentryOutput);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {int} minLevel
 */
let SentryHandler = class SentryHandler extends _nightingaleHandler2.default {
    /**
     * @param ravenUrl
     * @param minLevel
    */
    constructor(ravenUrl, minLevel) {
        super(minLevel, () => {}, (0, _nightingaleSentryOutput2.default)(ravenUrl));
    }
};
exports.default = SentryHandler;
//# sourceMappingURL=index.js.map