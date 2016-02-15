import Handler from '../Handler';
import LogLevel from '../LogLevel';
import LayoutBrowserConsole from '../layouts/LayoutBrowserConsole';
import * as formatterBrowserConsole from '../formatters/formatterBrowserConsole';
import * as outputConsole from '../outputs/outputBrowserConsole';

const debugValues = ((querystring) => {
    let debugFromLocalStorage = global.localStorage && localStorage.DEBUG && localStorage.DEBUG || [];
    if (typeof debugFromLocalStorage === 'string') {
        debugFromLocalStorage = debugFromLocalStorage.split(',');
    }

    if (!querystring) {
        return debugFromLocalStorage;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/URLUtils/search#Get_the_value_of_a_single_search_param
    return debugFromLocalStorage.concat(decodeURI(
        querystring.replace(
            new RegExp('^(?:.*[&\\?]' + 'DEBUG' + '(?:\\=([^&]*))?)?.*$', 'i'),
            '$1'
        )
    ).split(','));
})(location.search);

export default class BrowserConsoleHandler extends Handler {
    /**
     * @param {int} minLevel see {@link LogLevel}
      * @param {string} [name] based on localStorage.DEBUG or querystring to determine the minimum level displayed
     */
    constructor(minLevel, name) {
        if (name) {
            let debug = debugValues[0] === '*' || debugValues.indexOf(name) !== -1;
            if (!debug && name.includes('.')) {
                debug = debugValues.indexOf(name.split('.')[0]) !== -1;
            }

            minLevel = debug ? LogLevel.ALL : (minLevel || LogLevel.WARN);
        }

        super(
            minLevel,
            new LayoutBrowserConsole(formatterBrowserConsole),
            outputConsole
        );
    }
}
