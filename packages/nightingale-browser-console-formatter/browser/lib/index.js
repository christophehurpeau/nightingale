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
    var args = [];
    var string = (0, _nightingaleFormatter.formatRecordToString)(record, function (styles, string) {
        if (!styles || !styles.length || !string) {
            return string;
        }

        args.push(['reset'].concat(styles).map(function (styleName) {
            return _nightingaleFormatter.styleToHtmlStyle[styleName];
        }).join('; '));
        args.push(_nightingaleFormatter.styleToHtmlStyle.reset);
        return '%c' + string + '%c';
    });

    return [string, args];
}
//# sourceMappingURL=index.js.map