var Logger = require('./index').Logger;

var ansi = require('ansi-styles');

export class LoggerConsole extends Logger {
    write(str, logLevel) {
        process[ logLevel === 'error' || logLevel === 'fatal' ? 'stderr' : 'stdout' ].write(str);
        return this;
    }
}

LoggerConsole.style = function(styles, string) {
    if (!styles.length || !string) {
        return string;
    }
    return styles.reduce(function(string, styleName) {
        var style = ansi[styleName];
        return style.open + string + style.close;
    }, string);
};
Logger._inject(LoggerConsole);