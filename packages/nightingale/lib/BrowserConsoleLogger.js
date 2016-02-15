'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _BrowserConsoleHandler = require('./handlers/BrowserConsoleHandler');

var _BrowserConsoleHandler2 = _interopRequireDefault(_BrowserConsoleHandler);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A simplified way of creating a {@link Logger} with a {@link ConsoleHandler}
 */
let BrowserConsoleLogger = class BrowserConsoleLogger extends _Logger2.default {
    /**
     * Creates a new ConsoleLogger with a prefix.
     *
     * the min level is ALL if name is in `process.env.DEBUG`
     *
     * @param {string} name
     * @param {int} [defaultMinLevel] default is WARN
    */
    constructor(name, defaultMinLevel) {
        super([new _BrowserConsoleHandler2.default(defaultMinLevel, name)]);

        if (name) {
            this.setPrefix(`[${ name }]`);
        }
    }
};
exports.default = BrowserConsoleLogger;
//# sourceMappingURL=BrowserConsoleLogger.js.map