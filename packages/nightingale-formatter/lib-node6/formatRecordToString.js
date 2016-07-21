'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = formatRecordToString;

var _levelToSymbol = require('./levelToSymbol');

var _levelToSymbol2 = _interopRequireDefault(_levelToSymbol);

var _levelToStyles = require('./levelToStyles');

var _levelToStyles2 = _interopRequireDefault(_levelToStyles);

var _formatObject = require('./formatObject');

var _formatObject2 = _interopRequireDefault(_formatObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatRecordToString(record, style, options) {
    let parts = [];

    if (record.displayName) {
        parts.push(style(['gray-light'], record.displayName));
    } else if (record.key) {
        parts.push(style(['gray-light'], record.key));
    }

    if (record.datetime) {
        parts.push(style(['gray', 'bold'], record.datetime.toTimeString().split(' ')[0]));
        /* new Date().toFormat('HH24:MI:SS') */
    }

    let message = record.symbol || _levelToSymbol2.default[record.level];
    let styles = record.styles || _levelToStyles2.default[record.level];

    if (record.message) {
        if (message) {
            message += ` ${ record.message }`;
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

    ['metadata', 'extra', 'context'].forEach(key => {
        if (!record[key]) {
            return;
        }

        const stringObject = (0, _formatObject2.default)(record[key], style, record[`${ key }Styles`]);

        if (!stringObject) {
            return;
        }

        parts.push(stringObject);
    });

    return parts.join(' ');
}
//# sourceMappingURL=formatRecordToString.js.map