import ansi from 'ansi-styles';
import { levelToSymbol, levelToStyles, styleToHexColor } from 'nightingale-formatter';

const ansiStyles = {
    black: ansi.black,
    red: ansi.red,
    green: ansi.green,
    yellow: ansi.yellow,
    blue: ansi.blue,
    magenta: ansi.magenta,
    cyan: ansi.cyan,
    white: ansi.white,
    gray: ansi.gray,

    bgBlack: ansi.bgBlack,
    bgRed: ansi.bgRed,
    bgGreen: ansi.bgGreen,
    bgYellow: ansi.bgYellow,
    bgBlue: ansi.bgBlue,
    bgMagenta: ansi.bgMagenta,
    bgCyan: ansi.bgCyan,
    bgWhite: ansi.bgWhite,

    bold: ansi.bold,
    underline: ansi.underline,

    // http://www.calmar.ws/vim/256-xterm-24bit-rgb-color-chart.html
    orange: { open: ansi.color.ansi256.hex(styleToHexColor['orange']), close: ansi.color.close },
    'gray-light': { open: ansi.color.ansi256.hex(styleToHexColor['gray-light']), close: ansi.color.close },
};

export function style(styles, string) {
    if (!styles || !styles.length || !string) {
        return string;
    }

    return styles.reduce((string, styleName) => {
        let style = ansiStyles[styleName];

        if (!style) {
            throw new Error(`Unknown style: ${styleName}`);
        }

        return style.open + string + style.close;
    }, string);
}

// TODO create package
function displayObject(object, metadataStyles) {
    const keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    return `{ ${keys.map(key => {
        const value = object[key];
        let styles = metadataStyles && metadataStyles[key];
        if (!styles) {
            switch (typeof value) {
                case 'number':
                    styles = ['yellow'];
                    break;
                case 'string':
                    styles = ['orange'];
                    break;

            }
        }
        return `${key}: ${style(styles, value.constructor === Object ? displayObject(value) : JSON.stringify(value))}`;
    }).join(', ')} }`;
}

/**
 * @param {Object} record
 * @returns {string}
 */
export default function format(record) {
    let string = '';
    if (record.key) {
        string += style(['gray-light'], record.key);
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
