import ansi from 'ansi-styles';
import { levelToSymbol, levelToStyles } from 'nightingale-formatter';

export function style(styles, string) {
    return string;
}

// TODO create package
function displayObject(object, metadataStyles) {
    const keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    return `{ ${keys.map(key => {
        return `${key}: ${style(metadataStyles && metadataStyles[key], JSON.stringify(object[key]))}`;
    }).join(', ')} }`;
}

/**
 * @param {Object} record
 * @returns {string}
 */
export default function format(record) {
    let string = '';
    if (record.key) {
        string += style(['gray'], record.key);
    }

    if (record.datetime) {
        if (string.length !== 0) {
            string += ' ';
        }

        string += style(['gray', 'bold'], record.datetime.toTimeString().split(' ')[0]);
        /* new Date().toFormat('HH24:MI:SS') */
    }

    let message = record.symbol || levelToSymbol[record.level];
    let styles = record.styles || levelToStyles[record.level];

    if (record.message) {
        if (message && message.length !== 0) {
            message += ` ${record.message}`;
        } else {
            message = record.message;
        }
    }

    if (styles) {
        message = style(styles, message);
    }

    if (string.length !== 0) {
        string += ' ';
    }

    string += message;

    if (record.metadata) {
        const stringObject = displayObject(record.metadata, record.metadataStyles);

        if (stringObject) {
            if (string.length !== 0) {
                string += ' ';
            }

            string += stringObject;
        }
    }

    if (record.extra) {
        const stringObject = displayObject(record.extra);

        if (stringObject) {
            if (string.length !== 0) {
                string += ' ';
            }

            string += stringObject;
        }
    }

    return string;
}

// export style function
format.style = style;
