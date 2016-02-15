'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _ConsoleHandler = require('./handlers/ConsoleHandler');

var _ConsoleHandler2 = _interopRequireDefault(_ConsoleHandler);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A simplified way of creating a {@link Logger} with a {@link ConsoleHandler}
 *
 *  Creates a new ConsoleLogger with a prefix.
 *
 * the min level is ALL if name is in `process.env.DEBUG`
 *
 * @param {string} name
 * @param {int} [defaultMinLevel] default is WARN
 */
let ConsoleLogger = class ConsoleLogger extends _Logger2.default {
    /**
     * @param name
     * @param defaultMinLevel
    */
    constructor(name, defaultMinLevel) {
        super([new _ConsoleHandler2.default(defaultMinLevel, name)]);

        if (name) {
            this.setPrefix(`[${ name }]`);
        }
    }
};
exports.default = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map