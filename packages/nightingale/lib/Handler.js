'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _levels = require('./levels');

var _levels2 = _interopRequireDefault(_levels);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Abstract class that handles a record.
 *
 * Has a min level to discard record lower that this level.
 */
let Handler = class Handler {
    /**
     * @param {int} minLevel
     * @param {Layout} layout
     * @param {Output} output
    */
    constructor(minLevel, layout, output) {
        this.minLevel = minLevel;
        this.layout = layout;
        this.output = output;

        _levels2.default.forEach(level => {
            if (level.value < minLevel) {
                this[level.lcKey] = /**
                                     * @function
                                    */function () {};
            }
        });
    }

    /**
     * @param {Object} record
    */
    handle(record) {
        if (record.level < this.minLevel) {
            return;
        }

        const formatted = this.layout.format(record);
        this.output.write(formatted);
    }
};
exports.default = Handler;
//# sourceMappingURL=Handler.js.map