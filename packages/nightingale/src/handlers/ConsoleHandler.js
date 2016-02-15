import Handler from '../Handler';
import LogLevel from '../LogLevel';
import LayoutDefault from '../layouts/LayoutDefault';
import * as formatterANSI from '../formatters/formatterANSI';
import * as outputConsole from '../outputs/outputConsole';

const debugValues = process.env.DEBUG && process.env.DEBUG.split(',') || [];

export default class ConsoleHandler extends Handler {
    /**
     * @param {int} minLevel see {@link LogLevel}
     * @param {string} [name] based on process.env.DEBUG to determine the minimum level displayed
     */
    constructor(minLevel, name) {
        if (name) {
            let debug = debugValues[0] === '*' || debugValues.indexOf(name) !== -1;
            if (!debug && minLevel.includes('.')) {
                debug = debugValues.indexOf(minLevel.split('.')[0]) !== -1;
            }

            minLevel = debug ? LogLevel.ALL : (minLevel || LogLevel.WARN);
        }

        super(
            minLevel,
            new LayoutDefault(formatterANSI),
            outputConsole
        );
    }
}
