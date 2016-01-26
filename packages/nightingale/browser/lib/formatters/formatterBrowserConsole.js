'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.format = format;

var _levelToSymbol = require('./_levelToSymbol');

var _levelToSymbol2 = _interopRequireDefault(_levelToSymbol);

var _levelToStyles = require('./_levelToStyles');

var _levelToStyles2 = _interopRequireDefault(_levelToStyles);

var _styleToHtmlStyle = require('./_styleToHtmlStyle');

var _styleToHtmlStyle2 = _interopRequireDefault(_styleToHtmlStyle);

/**
 * @function
 * @param obj
*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param arr
*/
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @function
 * @param styles
*/

function style(styles) {
    return styles.map(function (styleName) {
        return _styleToHtmlStyle2.default[styleName];
    }).join('; ');
}

/**
 * @function
 * @param object
 * @param contextStyles
 * @param args
*/function displayObject(object, contextStyles, args) {
    var keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    args.push(style(['reset', 'gray']));
    return '%c{ ' + keys.map(function (key) {
        var _ref;

        var styles = contextStyles && contextStyles[key];
        args.push(style(['reset', 'gray', 'bold']));
        args.push(style((_ref = ['reset']).concat.apply(_ref, _toConsumableArray(styles))));
        args.push(style(['reset', 'gray']));

        return '%c' + key + ': %c' + JSON.stringify(object[key]) + '%c';
    }).join(', ') + ' }';
}

/**
 * @param {Object} record
 * @returns {Object}
 */
/**
 * @function
 * @param record
*/function format(record) {
    var string = '';
    var args = [];

    if (record.prefix) {
        string += '%c' + record.prefix;
        args.push(style(['gray']));
    }

    if (record.datetime) {
        if (string.length !== 0) {
            string += ' ';
        }

        args.push(style(['gray', 'bold']));
        string += '%c' + record.datetime.toTimeString().split(' ')[0];
    }

    var message = record.symbol || _levelToSymbol2.default[record.level];
    var styles = record.styles || _levelToStyles2.default[record.level];

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

    if (record.context) {
        var stringObject = displayObject(record.context, record.contextStyles, args);

        if (stringObject) {
            if (string.length !== 0) {
                string += ' ';
            }

            string += stringObject;
        }
    }

    return [string].concat(args);
}
//# sourceMappingURL=formatterBrowserConsole.js.map