import htmlStyles from './_styleToHtmlStyle';

export function style(styles, string) {
    if (!styles || !styles.length || !string) {
        return string;
    }

    return '<span style="' + styles.map(function (styleName) {
        return htmlStyles[styleName];
    }).join('; ') + '">' + string + '</span>';
}

/**
 * @param {Object} record
 * @returns {string}
 */
export function format(record) {
    let string = '';
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
