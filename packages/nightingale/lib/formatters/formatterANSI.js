'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.style = style;
exports.format = format;

var _ansiStyles = require('ansi-styles');

var _ansiStyles2 = _interopRequireDefault(_ansiStyles);

var _levelToSymbol = require('./_levelToSymbol');

var _levelToSymbol2 = _interopRequireDefault(_levelToSymbol);

var _levelToStyles = require('./_levelToStyles');

var _levelToStyles2 = _interopRequireDefault(_levelToStyles);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param styles
 * @param string
*/function style(styles, string) {
    if (!styles || !styles.length || !string) {
        return string;
    }

    return styles.reduce((string, styleName) => {
        let style = _ansiStyles2.default[styleName];

        if (!style) {
            throw new Error(`Unknown style: ${ styleName }`);
        }

        return style.open + string + style.close;
    }, string);
}

/**
 * @function
 * @param object
 * @param contextStyles
*/function displayObject(object, contextStyles) {
    const keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    return `{ ${ keys.map(key => {
        return `${ key }: ${ this.style(contextStyles && contextStyles[key], JSON.stringify(object[key])) }`;
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

    let message = record.symbol || _levelToSymbol2.default[record.level];
    let styles = record.styles || _levelToStyles2.default[record.level];

    if (record.message) {
        if (message && message.length !== 0) {
            message += ` ${ record.message }`;
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
//# sourceMappingURL=formatterANSI.js.map