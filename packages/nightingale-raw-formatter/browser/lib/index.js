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

/**
 * @function
 * @param styles
 * @param string
*/function style(styles, string) {
    return string;
}

// TODO create package
/**
 * @function
 * @param object
 * @param metadataStyles
*/function displayObject(object, metadataStyles) {
    var keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    return '{ ' + keys.map(function (key) {
        return key + ': ' + style(metadataStyles && metadataStyles[key], JSON.stringify(object[key]));
    }).join(', ') + ' }';
}

/**
 * @param {Object} record
 * @returns {string}
 */
/**
 * @function
 * @param record
*/function format(record) {
    var string = '';
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

    var message = record.symbol || _nightingaleFormatter.levelToSymbol[record.level];
    var styles = record.styles || _nightingaleFormatter.levelToStyles[record.level];

    if (record.message) {
        if (message && message.length !== 0) {
            message += ' ' + record.message;
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
        var stringObject = displayObject(record.metadata, record.metadataStyles);

        if (stringObject) {
            if (string.length !== 0) {
                string += ' ';
            }

            string += stringObject;
        }
    }

    if (record.extra) {
        var _stringObject = displayObject(record.extra);

        if (_stringObject) {
            if (string.length !== 0) {
                string += ' ';
            }

            string += _stringObject;
        }
    }

    return string;
}

// export style function
format.style = style;
//# sourceMappingURL=index.js.map