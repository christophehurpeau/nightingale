'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.style = style;
exports.format = format;

var _styleToHtmlStyle = require('./_styleToHtmlStyle');

var _styleToHtmlStyle2 = _interopRequireDefault(_styleToHtmlStyle);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param styles
 * @param string
*/function style(styles, string) {
    if (!styles || !styles.length || !string) {
        return string;
    }

    return '<span style="' + styles.map(function (styleName) {
        return _styleToHtmlStyle2.default[styleName];
    }).join('; ') + '">' + string + '</span>';
}

/**
 * @param {Object} record
 * @returns {string}
 */
/**
 * @function
 * @param record
*/function format(record) {
    var string = '';
    if (record.prefix) {
        string += record.prefix + ' ';
    }

    if (record.datetime) {
        string += this.style('bold', record.datetime.toFormat('HH24:MI:SS') + ' ');
        /* toTimeString().split(' ')[0] */
    }

    if (record.message) {
        string += record.message;
    }

    if (record.context) {
        string += JSON.stringify(record.context);
    }

    if (record.extra) {
        string += JSON.stringify(record.extra);
    }

    return string;
}
//# sourceMappingURL=formatterHtml.js.map