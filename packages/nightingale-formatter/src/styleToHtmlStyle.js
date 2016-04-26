import hexColors from './styleToHexColor';

const htmlStyles = {
    reset: [
        'font-weight: normal',
        'font-style: normal',
        'text-decoration: none',
        'unicode-bidi: normal',
        'direction: ltr',
        'color: initial',
        'background: initial',
    ].join(';'),

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

    orange: `color: #${hexColors.orange}`,
    grayLight: `color: #${hexColors.grayLight}`,
    'gray-light': `color: #${hexColors.grayLight}`,
};

export default htmlStyles;
