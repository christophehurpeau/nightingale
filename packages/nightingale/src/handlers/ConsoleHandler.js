import Handler from '../Handler';
import LayoutDefault from '../layouts/LayoutDefault';
import * as formatterANSI from '../formatters/formatterANSI';
import * as outputConsole from '../outputs/outputConsole';

export default class ConsoleHandler extends Handler {
    /**
     * @param {int} minLevel
     */
    constructor(minLevel) {
        super(
            minLevel,
            new LayoutDefault(formatterANSI),
            outputConsole
        );
    }
}
