'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = format;

var _nightingaleFormatter = require('nightingale-formatter');

/**
 * @function
 * @param record
*/

/**
 * @param {Object} record
 * @returns {Array}
 */
function format(record) {
    const args = [];
    const string = (0, _nightingaleFormatter.formatRecordToString)(record, (styles, string) => {
        if (!styles || !styles.length || !string) {
            return string;
        }

        args.push(['reset'].concat(styles).map(styleName => _nightingaleFormatter.styleToHtmlStyle[styleName]).join('; '));
        args.push(_nightingaleFormatter.styleToHtmlStyle.reset);
        return `%c${ string }%c`;
    });

    return [string, args];
}
//# sourceMappingURL=index.js.map