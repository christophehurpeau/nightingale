import { levelToSymbol, levelToStyles, styleToHtmlStyle } from 'nightingale-formatter';

function style(styles, string) {
    return styles.map(styleName => styleToHtmlStyle[styleName]).join('; ');
}

function displayObject(object, metadataStyles) {
    const keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    args.push(style(['reset', 'gray']));
    return `%c{ ${keys.map(key => {
        const styles = metadataStyles && metadataStyles[key] || [];
        args.push(style(['reset', 'gray', 'bold']));
        args.push(style(['reset'].concat(...styles)));
        args.push(style(['reset', 'gray']));

        return `%c${key}: %c${JSON.stringify(object[key])}%c`;
    }).join(', ')} }`;
}

/**
 * @param {Object} record
 * @returns {string}
 */
export default function format(record) {
    let string = '';
    const args = [];

    if (record.key) {
        string += `%c${record.key}`;
        args.push(style(['gray']));
    }

    if (record.datetime) {
        if (string.length !== 0) {
            string += ' ';
        }

        args.push(style(['gray', 'bold']));
        string += `%c${record.datetime.toTimeString().split(' ')[0]}`;
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
        message = `%c${message}`;
        args.push(style(styles));
    }

    if (string.length !== 0) {
        string += ' ';
    }

    string += message;

    if (record.metadata) {
        const stringObject = displayObject(record.metadata, record.metadataStyles, args);

        if (stringObject) {
            if (string.length !== 0) {
                string += ' ';
            }

            string += stringObject;
        }
    }

    return [
        string,
        ...args,
    ];
}
