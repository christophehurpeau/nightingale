import ansi from 'ansi-styles';
import levelToSymbol from './_levelToSymbol';
import levelToStyles from './_levelToStyles';

export function style(styles, string) {
    if (!styles || !styles.length || !string) {
        return string;
    }

    return styles.reduce(function (string, styleName) {
        let style = ansi[styleName];

        if (!style) {
            throw new Error('Unknown style: ' + styleName);
        }

        return style.open + string + style.close;
    }, string);
}

function displayObject(object, contextStyles) {
    const keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    return '{ ' + keys.map(key => {
        return key + ': ' + this.style(contextStyles && contextStyles[key], JSON.stringify(object[key]));
    }).join(', ') + ' }';
}

/**
 * @param {Object} record
 * @returns {string}
 */
export function format(record) {
    let string = '';
    if (record.prefix) {
        string += this.style(['gray'], record.prefix);
    }

    if (record.datetime) {
        if (string.length !== 0) {
            string += ' ';
        }

        string += this.style(['gray', 'bold'], record.datetime.toTimeString().split(' ')[0]);
        /* new Date().toFormat('HH24:MI:SS') */
    }

    let message = record.symbol || levelToSymbol[record.level];
    let styles = record.styles || levelToStyles[record.level];

    if (record.message) {
        if (message && message.length !== 0) {
            message += ' ' + record.message;
        } else {
            message = record.message;
        }
    }

    if (styles) {
        message = this.style(styles, message);
    }

    if (string.length !== 0) {
        string += ' ';
    }

    string += message;

    if (record.context) {
        const stringObject = displayObject.call(this, record.context, record.contextStyles);

        if (stringObject) {
            if (string.length !== 0) {
                string += ' ';
            }

            string += stringObject;
        }
    }

    if (record.extra) {
        const stringObject = displayObject.call(this, record.extra);

        if (stringObject) {
            if (string.length !== 0) {
                string += ' ';
            }

            string += stringObject;
        }
    }

    return string;
}

