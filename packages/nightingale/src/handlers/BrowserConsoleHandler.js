import Handler from '../Handler';
import LogLevel from '../LogLevel';
import LayoutBrowserConsole from '../layouts/LayoutBrowserConsole';
import * as formatterBrowserConsole from '../formatters/formatterBrowserConsole';
import * as outputConsole from '../outputs/outputBrowserConsole';

const debugValues = ((querystring) => {
    if (!querystring) {
        return [];
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
    return decodeURI(
        querystring.replace(
            new RegExp('^(?:.*[&\\?]' + 'DEBUG' + '(?:\\=([^&]*))?)?.*$', 'i'),
            '$1'
        )
    ).split(',');
})(location.search);

export default class BrowserConsoleHandler extends Handler {
    /**
     * @param {int|string} minLevel if int, see {@link LogLevel} ; if string, based on process.env.DEBUG
     */
    constructor(minLevel) {
        if (typeof minLevel === 'string') {
            let debug = debugValues[0] === '*' || debugValues.indexOf(minLevel) !== -1;
            if (!debug && minLevel.includes('.')) {
                debug = debugValues.indexOf(minLevel.split('.')[0]) !== -1;
            }

            minLevel = debug ? LogLevel.ALL : LogLevel.WARN;
        }

        super(
            minLevel,
            new LayoutBrowserConsole(formatterBrowserConsole),
            outputConsole
        );
    }
}
