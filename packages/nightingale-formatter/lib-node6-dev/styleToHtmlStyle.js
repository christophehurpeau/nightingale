'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _styleToHexColor = require('./styleToHexColor');

var _styleToHexColor2 = _interopRequireDefault(_styleToHexColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const htmlStyles = {
    reset: ['font-weight: normal', 'font-style: normal', 'text-decoration: none', 'unicode-bidi: normal', 'direction: ltr', 'color: initial', 'background: initial'].join(';'),

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
    bgWhite: 'background: white',

    orange: `color: #${ _styleToHexColor2.default.orange }`,
    grayLight: `color: #${ _styleToHexColor2.default.grayLight }`,
    'gray-light': `color: #${ _styleToHexColor2.default.grayLight }`
};

exports.default = htmlStyles;
//# sourceMappingURL=styleToHtmlStyle.js.map