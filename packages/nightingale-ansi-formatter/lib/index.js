'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.style = style;
exports.default = format;

var _ansiStyles = require('ansi-styles');

var _ansiStyles2 = _interopRequireDefault(_ansiStyles);

var _nightingaleFormatter = require('nightingale-formatter');

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ansiStyles = {
    black: _ansiStyles2.default.black,
    red: _ansiStyles2.default.red,
    green: _ansiStyles2.default.green,
    yellow: _ansiStyles2.default.yellow,
    blue: _ansiStyles2.default.blue,
    magenta: _ansiStyles2.default.magenta,
    cyan: _ansiStyles2.default.cyan,
    white: _ansiStyles2.default.white,
    gray: _ansiStyles2.default.gray,

    bgBlack: _ansiStyles2.default.bgBlack,
    bgRed: _ansiStyles2.default.bgRed,
    bgGreen: _ansiStyles2.default.bgGreen,
    bgYellow: _ansiStyles2.default.bgYellow,
    bgBlue: _ansiStyles2.default.bgBlue,
    bgMagenta: _ansiStyles2.default.bgMagenta,
    bgCyan: _ansiStyles2.default.bgCyan,
    bgWhite: _ansiStyles2.default.bgWhite,

    bold: _ansiStyles2.default.bold,
    underline: _ansiStyles2.default.underline,

    // http://www.calmar.ws/vim/256-xterm-24bit-rgb-color-chart.html
    orange: { open: _ansiStyles2.default.color.ansi256.hex(_nightingaleFormatter.styleToHexColor['orange']), close: _ansiStyles2.default.color.close },
    'gray-light': { open: _ansiStyles2.default.color.ansi256.hex(_nightingaleFormatter.styleToHexColor['gray-light']), close: _ansiStyles2.default.color.close }
};

/**
 * @function
 * @param styles
 * @param string
*/function style(styles, string) {
    if (!styles || !styles.length || !string) {
        return string;
    }

    return styles.reduce((string, styleName) => {
        let style = ansiStyles[styleName];

        if (!style) {
            throw new Error(`Unknown style: ${ styleName }`);
        }

        return style.open + string + style.close;
    }, string);
}

// TODO create package
/**
 * @function
 * @param object
 * @param metadataStyles
*/function displayObject(object, metadataStyles) {
    const keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    return `{ ${ keys.map(key => {
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
        return `${ key }: ${ style(styles, value.constructor === Object ? displayObject(value) : JSON.stringify(value)) }`;
    }).join(', ') } }`;
}

/**
 * @param {Object} record
 * @returns {string}
 */
/**
 * @function
 * @param record
*/function format(record) {
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

    let message = record.symbol || _nightingaleFormatter.levelToSymbol[record.level];
    let styles = record.styles || _nightingaleFormatter.levelToStyles[record.level];

    if (record.message) {
        if (message && message.length !== 0) {
            message += ` ${ record.message }`;
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
//# sourceMappingURL=index.js.map