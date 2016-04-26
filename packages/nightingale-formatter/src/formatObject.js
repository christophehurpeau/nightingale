export default function formatObject(object, styleFn, objectStyles) {
    const keys = Object.keys(object);

    if (keys.length === 0) {
        return;
    }

    let brokeLine = false;
    const formattedKeyValues = keys.map((key, index) => {
        let breakLine = false;
        const value = object[key];
        let styles = objectStyles && objectStyles[key];

        if (!styles) {
            switch (typeof value) {
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

        let stringValue;
        if (value.constructor === Object) {
            stringValue = formatObject(value, styleFn);
        } else if (value instanceof Error) {
            stringValue = value.stack || value.message;
        } else {
            stringValue = JSON.stringify(value);
        }

        if (stringValue.length > 80 || stringValue.indexOf('\n') !== -1) {
            brokeLine = breakLine = true;
        }

        return `${breakLine && index !== 0 ? '\n ' : ''}${styleFn(['gray-light', 'bold'], `${key}:`)}`
            + ` ${styleFn(styles, stringValue)}${breakLine ? '\n ' : ''}`;
    });

    return `{${brokeLine ? '\n ' : ' '}${formattedKeyValues.join(styleFn(['gray'], ', '))} }`;
}
