'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.style = style;
exports.format = format;
const htmlStyles = {
    // text style
    bold: 'font-weight: bold',
    italic: 'font-style: italic',
    underline: 'text-decoration: underline',
    inverse: 'unicode-bidi: bidi-override; direction: rtl',
    strikethrough: 'text-decoration: line-through',

    black: 'color: black',
    red: 'color: red',
    green: 'color: green',
    yellow: 'color: yellow',
    blue: 'color: #4682B4',
    magenta: 'color: magenta',
    cyan: 'color: cyan',
    white: 'color: white',
    gray: 'color: gray',

    bgBlack: 'background: black',
    bgRed: 'background: red',
    bgGreen: 'background: green',
    bgYellow: 'background: yellow',
    bgBlue: 'background: blue',
    bgMagenta: 'background: magenta',
    bgCyan: 'background: cyan',
    bgWhite: 'background: white'
};

/** @function 
* @param styles 
* @param string */
function style(styles, string) {
    if (!styles || !styles.length || !string) {
        return string;
    }

    return '<span style="' + styles.map( /** @function 
                                         * @param styleName */function (styleName) {
        return htmlStyles[styleName];
    }).join('; ') + '">' + string + '</span>';
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
        string += record.prefix + ' ';
    }

    if (record.datetime) {
        string += this.style('bold', record.datetime.toFormat('HH24:MI:SS') + ' ');
        /* toTimeString().split(' ')[0] */
    }

    if (record.message) {
        string += record.message;
    }

    if (record.context) {
        string += JSON.stringify(record.context);
    }

    if (record.extra) {
        string += JSON.stringify(record.extra);
    }

    return string;
}
//# sourceMappingURL=formatterHtml.js.map