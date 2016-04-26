import levelToSymbol from './levelToSymbol';
import levelToStyles from './levelToStyles';
import formatObject from './formatObject';

export default function formatRecordToString(record, style, options) {
    let parts = [];

    if (record.key) {
        parts.push(style(['gray-light'], record.key));
    }

    if (record.datetime) {
        parts.push(style(['gray', 'bold'], record.datetime.toTimeString().split(' ')[0]));
        /* new Date().toFormat('HH24:MI:SS') */
    }

    let message = record.symbol || levelToSymbol[record.level];
    let styles = record.styles || levelToStyles[record.level];

    if (record.message) {
        if (message) {
            message += ` ${record.message}`;
        } else {
            message = record.message;
        }
    }

    if (message) {
        if (styles) {
            message = style(styles, message);
        }
        parts.push(message);
    }

    ['metadata', 'extra'].forEach(key => {
        if (!record[key]) {
            return;
        }

        const stringObject = formatObject(record[key], style, record[`${key}Styles`]);

        if (!stringObject) {
            return;
        }

        parts.push(stringObject);
    });

    return parts.join(' ');
}
