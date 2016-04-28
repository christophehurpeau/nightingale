'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? /**
                                                                                     * @function
                                                                                     * @param obj
                                                                                    */ function (obj) { return typeof obj; } : /**
                                                                                                                                * @function
                                                                                                                                * @param obj
                                                                                                                               */ function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = formatObject;
/**
 * @function
 * @param object
 * @param styleFn
 * @param objectStyles
*/function formatObject(object, styleFn, objectStyles) {
    var keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    var brokeLine = false;
    var formattedKeyValues = keys.map(function (key, index) {
        var breakLine = false;
        var value = object[key];
        var styles = objectStyles && objectStyles[key];

        if (!styles) {
            switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
                case 'boolean':
                    styles = ['green'];
                    break;
                case 'number':
                    styles = ['yellow'];
                    break;
                case 'string':
                    styles = ['orange'];
                    break;

            }
        }

        var stringValue = void 0;
        if (value && value.constructor === Object) {
            stringValue = formatObject(value, styleFn);
        } else if (value instanceof Error) {
            stringValue = value.stack || value.message;
        } else {
            stringValue = JSON.stringify(value);
        }

        if (stringValue && (stringValue.length > 80 || stringValue.indexOf('\n') !== -1)) {
            brokeLine = breakLine = true;
        }

        return '' + (breakLine && index !== 0 ? '\n ' : '') + styleFn(['gray-light', 'bold'], key + ':') + (' ' + styleFn(styles, stringValue) + (breakLine ? '\n ' : ''));
    });

    return '{' + (brokeLine ? '\n ' : ' ') + formattedKeyValues.join(styleFn(['gray'], ', ')) + ' }';
}
//# sourceMappingURL=formatObject.js.map