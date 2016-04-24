import { levelToSymbol, levelToStyles, styleToHtmlStyle } from 'nightingale-formatter';

export function style(styles, string) {
    if (!styles || !styles.length || !string) {
        return string;
    }

    return `<span style="${styles.map(styleName => styleToHtmlStyle[styleName]).join('; ')}">${string}</span>`;
}

/**
 * @param {Object} record
 * @returns {string}
 */
export default function format(record) {
    let string = '';
    if (record.key) {
        string += `${record.key} `;
    }

    if (record.datetime) {
        string += this.style('bold', `${record.datetime.toFormat('HH24:MI:SS')} `);
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

    return `<div>${string}</div>\n`;
}
