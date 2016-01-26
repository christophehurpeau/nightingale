import levelToSymbol from './_levelToSymbol';
import levelToStyles from './_levelToStyles';
import htmlStyles from './_styleToHtmlStyle';

function style(styles) {
    return styles.map(styleName => htmlStyles[styleName]).join('; ');
}

function displayObject(object, contextStyles, args) {
    const keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    args.push(style(['reset', 'gray']));
    return `%c{ ${keys.map(key => {
        const styles = contextStyles && contextStyles[key];
        args.push(style(['reset', 'gray', 'bold']));
        args.push(style(['reset'].concat(...styles)));
        args.push(style(['reset', 'gray']));

        return `%c${key}: %c${JSON.stringify(object[key])}%c`;
    }).join(', ')} }`;
}

/**
 * @param {Object} record
 * @returns {Object}
 */
export function format(record) {
    let string = '';
    const args = [];

    if (record.prefix) {
        string += `%c${record.prefix}`;
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

    if (record.context) {
        const stringObject = displayObject(record.context, record.contextStyles, args);

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
