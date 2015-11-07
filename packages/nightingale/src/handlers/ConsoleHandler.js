import Handler from '../Handler';
import LogLevel from '../LogLevel';
import LayoutDefault from '../layouts/LayoutDefault';
import * as formatterANSI from '../formatters/formatterANSI';
import * as outputConsole from '../outputs/outputConsole';

const debugValues = process.env.DEBUG && process.env.DEBUG.split(',') || [];

export default class ConsoleHandler extends Handler {
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
            new LayoutDefault(formatterANSI),
            outputConsole
        );
    }
}
