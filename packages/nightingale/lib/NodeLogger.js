'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _alouette = require('alouette');

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let NodeLogger = class NodeLogger extends _Logger2.default {
    /**
     * Log an error message
     *
     * @param {string|Error} message
     * @param {Object} [context]
     * @param {Object} [contextStyles]
     * @return {Logger}
    */
    error(message, context, contextStyles) {
        if (typeof message !== 'object') {
            message = message.message || message;
        } else {
            let parsedError = (0, _alouette.parse)(message);
            message = parsedError.toString();
        }
        return super.error(message, context, contextStyles);
    }
};
exports.default = NodeLogger;
//# sourceMappingURL=NodeLogger.js.map