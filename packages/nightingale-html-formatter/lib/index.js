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
    if (!styles || !styles.length || !string) {
        return string;
    }

    return `<span style="${ styles.map(styleName => _nightingaleFormatter.styleToHtmlStyle[styleName]).join('; ') }">${ string }</span>`;
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
//# sourceMappingURL=index.js.map