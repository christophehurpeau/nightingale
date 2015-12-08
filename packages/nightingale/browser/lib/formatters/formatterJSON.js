"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.style = style;
exports.format = format;
function style(styles, string) {
    return string;
}

/**
 * @param {Object} record
 * @returns {Object}
 */
function format(record) {
    return {
        level: record.level,
        datetime: record.datetime,
        message: record.message,
        extra: record.extra,
        context: record.context
    };
}
//# sourceMappingURL=formatterJSON.js.map