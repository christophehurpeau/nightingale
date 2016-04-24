'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _nightingaleHandler = require('nightingale-handler');

var _nightingaleHandler2 = _interopRequireDefault(_nightingaleHandler);

var _nightingaleRawFormatter = require('nightingale-raw-formatter');

var _nightingaleRawFormatter2 = _interopRequireDefault(_nightingaleRawFormatter);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let StringHandler = class StringHandler extends _nightingaleHandler2.default {
    /**
     * @param {int} minLevel
    */
    constructor(minLevel) {
        super(minLevel, _nightingaleRawFormatter2.default);

        this._buffer = '';
        this.write = string => {
            this._buffer += string;
            this._buffer += '\n';
        };
    }

    /**
     * @member string
    */get string() {
        return this._buffer;
    }
};
exports.default = StringHandler;
//# sourceMappingURL=index.js.map