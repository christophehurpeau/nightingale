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
    let string = '';
    if (record.key) {
        string += `${ record.key } `;
    }

    if (record.datetime) {
        string += this.style('bold', `${ record.datetime.toFormat('HH24:MI:SS') } `);
        /* toTimeString().split(' ')[0] */
    }

    if (record.message) {
        string += record.message;
    }

    if (record.metadata) {
        string += ' ' + JSON.stringify(record.metadata);
    }

    if (record.extra) {
        string += ' ' + JSON.stringify(record.extra);
    }

    return `<div>${ string }</div>\n`;
}
//# sourceMappingURL=index.js.map