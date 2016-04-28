'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _nightingaleHandler = require('nightingale-handler');

var _nightingaleHandler2 = _interopRequireDefault(_nightingaleHandler);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {int} minLevel
 */
let WinstonAdapterHandler = class WinstonAdapterHandler extends _nightingaleHandler2.default {
    /**
     * @param winstonTransport
     * @param minLevel
    */
    constructor(winstonTransport, minLevel) {
        super(minLevel);
        this.winstonTransport = winstonTransport;
    }

    /**
     * @param record
    */handle(record) {
        return new Promise((resolve, reject) => {
            this.winstonTransport.log(record.level, record.message, {
                key: record.key,
                metadata: record.metadata,
                extra: record.extra
            }, err => {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        });
    }
};
exports.default = WinstonAdapterHandler;
//# sourceMappingURL=index.js.map