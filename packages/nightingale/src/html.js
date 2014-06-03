var Logger = require('./index').Logger;

var htmlStyles = {
    //text style
    bold: 'font-size: bold',
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

    //colors

};

export class LoggerHtml extends Logger {
    constructor() {
        super();
        this.html = '';
    }
    write(html) {
        this.html += html;
        return this;
    }
    nl(){
        this.html += '<br/>';
        return this;
    }
}


LoggerHtml.style = function(styles, string) {
    if (!styles.length || !string) {
        return string;
    }
    return '<span style="' + styles.map(function(styleName) {
        return htmlStyles[styleName];
    }).join('; ') + '">' + string + '</span>';
};
Logger._inject(LoggerHtml);