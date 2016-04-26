'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.style = style;
exports.default = format;

var _nightingaleFormatter = require('nightingale-formatter');

/**
 * @function
 * @param styles
 * @param string
*/function style(styles, string) {
    return string;
}

/**
 * @param {Object} record
 * @returns {string}
 */
/**
 * @function
 * @param record
*/function format(record) {
    return (0, _nightingaleFormatter.formatRecordToString)(record, style);
}

// export style function
format.style = style;
//# sourceMappingURL=index.js.map