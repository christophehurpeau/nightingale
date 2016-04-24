'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = format;

var _nightingaleFormatter = require('nightingale-formatter');

/**
 * @function
 * @param arr
*/
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @function
 * @param styles
 * @param string
*/

function style(styles, string) {
    return styles.map(function (styleName) {
        return _nightingaleFormatter.styleToHtmlStyle[styleName];
    }).join('; ');
}

/**
 * @function
 * @param object
 * @param metadataStyles
*/function displayObject(object, metadataStyles) {
    var keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    args.push(style(['reset', 'gray']));
    return '%c{ ' + keys.map(function (key) {
        var _ref;

        var styles = metadataStyles && metadataStyles[key] || [];
        args.push(style(['reset', 'gray', 'bold']));
        args.push(style((_ref = ['reset']).concat.apply(_ref, _toConsumableArray(styles))));
        args.push(style(['reset', 'gray']));

        return '%c' + key + ': %c' + JSON.stringify(object[key]) + '%c';
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
    var args = [];

    if (record.key) {
        string += '%c' + record.key;
        args.push(style(['gray']));
    }

    if (record.datetime) {
        if (string.length !== 0) {
            string += ' ';
        }

        args.push(style(['gray', 'bold']));
        string += '%c' + record.datetime.toTimeString().split(' ')[0];
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
        message = '%c' + message;
        args.push(style(styles));
    }

    if (string.length !== 0) {
        string += ' ';
    }

    string += message;

    if (record.metadata) {
        var stringObject = displayObject(record.metadata, record.metadataStyles, args);

        if (stringObject) {
            if (string.length !== 0) {
                string += ' ';
            }

            string += stringObject;
        }
    }

    return [string].concat(args);
}
//# sourceMappingURL=index.js.map