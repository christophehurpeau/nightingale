import { formatRecordToString, styleToHtmlStyle } from 'nightingale-formatter';

/**
 * @param {Object} record
 * @returns {Array}
 */
export default function format(record) {
    var args = [];
    var string = formatRecordToString(record, function (styles, string) {
        if (!styles || !styles.length || !string) {
            return string;
        }

        args.push(['reset'].concat(styles).map(function (styleName) {
            return styleToHtmlStyle[styleName];
        }).join('; '));
        args.push(styleToHtmlStyle.reset);
        return '%c' + string + '%c';
    });

    return [string, args];
}
//# sourceMappingURL=index.js.map