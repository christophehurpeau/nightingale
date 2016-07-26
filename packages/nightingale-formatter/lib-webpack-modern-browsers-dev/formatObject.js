function tryStringify(arg) {
    try {
        return JSON.stringify(arg);
    } catch (_) {
        return '[Circular]';
    }
}

function internalFormatValue(value, styleFn, styles, { padding, depth, maxDepth, objects }) {
    var typeofValue = typeof value;

    if (!styles) {
        switch (typeofValue) {
            case value == null:
                styles = ['cyan'];
                break;
            case 'boolean':
                styles = ['green'];
                break;
            case 'number':
                styles = ['yellow'];
                break;
            case 'string':
                styles = ['orange'];
                break;
            case 'date':
                styles = ['magenta'];
                break;

        }
    }

    var stringValue = undefined;
    if (value === null) {
        stringValue = 'null';
    } else if (value === undefined) {
        stringValue = 'undefined';
    } else if (typeofValue === 'boolean') {
        stringValue = value.toString();
    } else if (value.constructor === Object) {
        if (depth >= maxDepth) {
            stringValue = '{object...}';
        } else {
            return internalFormatObject(value, styleFn, undefined, { padding, depth: depth + 1, maxDepth, objects });
        }
    } else if (Array.isArray(value)) {
        if (depth >= maxDepth) {
            stringValue = '[array...]';
        } else {
            return internalFormatArray(value, styleFn, { padding, depth: depth + 1, maxDepth, objects });
        }
    } else if (value instanceof Error) {
        stringValue = value.stack || value.message || '';
    } else {
        stringValue = tryStringify(value);
    }

    var formattedValue = styleFn(styles, stringValue);

    return {
        stringValue,
        formattedValue
    };
}

function internalFormatIterator(values, styleFn, objectStyles, { padding, depth, maxDepth, objects }, { prefix, suffix, prefixSuffixSpace = ' ' }) {
    var breakLine = false;

    values = values.map(({ key, value }, index) => {
        var nextDepth = depth + 1;

        var { stringValue, formattedValue } = internalFormatValue(value, styleFn, key && objectStyles && objectStyles[key], { padding, depth: nextDepth, maxDepth, objects });

        if (stringValue && (stringValue.length > 80 || stringValue.indexOf('\n') !== -1)) {
            breakLine = true;
            stringValue = stringValue.replace(/\n/g, `\n${ padding }`);
            formattedValue = formattedValue.replace(/\n/g, `\n${ padding }`);
        }

        return {
            stringValue,
            // eslint-disable-next-line no-useless-concat
            formattedValue: (key ? `${ styleFn(['gray-light', 'bold'], `${ key }:`) } ` : '') + formattedValue
        };
    });

    return {
        stringValue: prefix + values.map(breakLine ? v => {
            return `\n${ padding }${ v.stringValue }`;
        } : fv => {
            return fv.stringValue;
        }).join(breakLine ? ',\n' : ', ') + suffix,
        formattedValue: `${ prefix }${ breakLine ? '' : prefixSuffixSpace }` + `${ values.map(breakLine ? v => {
            return `\n${ padding }${ v.formattedValue }`;
        } : v => {
            return v.formattedValue;
        }).join(`${ styleFn(['gray'], ',') }${ breakLine ? '' : ' ' }`) }` + `${ breakLine ? `,\n` : prefixSuffixSpace }${ suffix }`
    };
}

function internalFormatObject(object, styleFn, objectStyles, { padding, depth, maxDepth, objects }) {
    if (objects.has(object)) {
        return { stringValue: '{Circular object}', formattedValue: '{Circular object}' };
    }

    var keys = Object.keys(object);
    if (keys.length === 0) {
        return {
            stringValue: '{}',
            formattedValue: '{}'
        };
    }

    objects.add(object);

    var result = internalFormatIterator(keys.map(key => {
        return { key, value: object[key] };
    }), styleFn, objectStyles, { padding, depth, maxDepth, objects }, { prefix: '{', suffix: '}' });

    objects.delete(object);

    return result;
}

function internalFormatArray(array, styleFn, { padding, depth, maxDepth, objects }) {
    if (objects.has(array)) {
        return { stringValue: '{Circular array}', formattedValue: '{Circular array}' };
    }

    if (array.length === 0) {
        return {
            stringValue: '[]',
            formattedValue: '[]'
        };
    }

    objects.add(array);

    var result = internalFormatIterator(array.map(value => {
        return { key: undefined, value };
    }), styleFn, undefined, { padding, depth, maxDepth, objects }, { prefix: '[', suffix: ']', prefixSuffixSpace: '' });

    objects.delete(array);

    return result;
}

export default function formatObject(object, styleFn, objectStyles, {
    padding = '  ',
    maxDepth = 10
} = {}) {
    var { formattedValue: result } = internalFormatObject(object, styleFn, objectStyles, { padding, maxDepth, depth: 0, objects: new Set() });

    if (result === '{}') {
        return '';
    }

    return result;
}
//# sourceMappingURL=formatObject.js.map