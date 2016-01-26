"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.style = style;
exports.format = format;
/**
 * @function
 * @param styles
 * @param string
*/function style(styles, string) {
    return string;
}

/**
 * @param {Object} record
 * @returns {Object}
 */
/**
 * @function
 * @param record
*/function format(record) {
    return {
        level: record.level,
        datetime: record.datetime,
        message: record.message,
        extra: record.extra,
        context: record.context
    };
}
//# sourceMappingURL=formatterJSON.js.map