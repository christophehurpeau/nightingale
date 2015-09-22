import Handler from '../Handler';
import LayoutDefault from '../layouts/LayoutDefault';
import * as formatterRaw from '../formatters/formatterRaw';
import OutputString from '../outputs/OutputString';

export default class StringHandler extends Handler {
    /**
     * @param {int} minLevel
     */
    constructor(minLevel) {
        super(
            minLevel,
            new LayoutDefault(formatterRaw),
            new OutputString()
        );
    }

    get string() {
        return this.output.string;
    }

}
