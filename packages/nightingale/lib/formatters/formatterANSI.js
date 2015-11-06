'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.style = style;
exports.format = format;

var _LogLevel = require('../LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

var _ansiStyles = require('ansi-styles');

var _ansiStyles2 = _interopRequireDefault(_ansiStyles);

const levelToSymbol = {};
levelToSymbol[_LogLevel2.default.TRACE] = '•';
levelToSymbol[_LogLevel2.default.DEBUG] = '•';
levelToSymbol[_LogLevel2.default.INFO] = '→';
levelToSymbol[_LogLevel2.default.WARN] = '⚠';
levelToSymbol[_LogLevel2.default.ERROR] = '✖';
levelToSymbol[_LogLevel2.default.CRITICAL] = '!';
levelToSymbol[_LogLevel2.default.FATAL] = '‼';
levelToSymbol[_LogLevel2.default.EMERGENCY] = '‼';

const levelToStyles = {};
levelToStyles[_LogLevel2.default.TRACE] = ['gray'];
levelToStyles[_LogLevel2.default.DEBUG] = ['gray'];
// levelToStyles[LogLevel.INFO] = ['gray'];
levelToStyles[_LogLevel2.default.WARN] = ['yellow'];
levelToStyles[_LogLevel2.default.ERROR] = ['red', 'bold'];
levelToStyles[_LogLevel2.default.CRITICAL] = ['red', 'bold'];
levelToStyles[_LogLevel2.default.FATAL] = ['bgRed', 'white'];
levelToStyles[_LogLevel2.default.EMERGENCY] = ['bgRed', 'white'];

/** @function 
* @param styles 
* @param string */
function style(styles, string) {
    if (!styles || !styles.length || !string) {
        return string;
    }

    return styles.reduce( /** @function 
                          * @param string 
                          * @param styleName */function (string, styleName) {
        let style = _ansiStyles2.default[styleName];

        if (!style) {
            throw new Error('Unknown style: ' + styleName);
        }

        return style.open + string + style.close;
    }, string);
}

/** @function 
* @param object 
* @param contextStyles */

function displayObject(object, contextStyles) {
    var _this = this;

    const keys = _Object$keys(object);

    if (keys.length === 0) {
        return;
    }

    return '{ ' + keys.map(function (key) {
        return key + ': ' + _this.style(contextStyles && contextStyles[key], JSON.stringify(object[key]));
    }).join(', ') + ' }';
}

/**
 * @param {Object} record
 * @returns {string}
 */
/** @function 
* @param record */
function format(record) {
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
//# sourceMappingURL=formatterANSI.js.map