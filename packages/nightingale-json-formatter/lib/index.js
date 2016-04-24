'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = format;
/**
 * @function
 * @param record
*/ /**
    * @param {Object} record
    * @returns {string}
    */
function format(record) {
    return JSON.stringify({
        key: record.key,
        level: record.level,
        datetime: record.datetime,
        message: record.message,
        metadata: record.metadata,
        extra: record.extra
    }) + '\n';
}
//# sourceMappingURL=index.js.map