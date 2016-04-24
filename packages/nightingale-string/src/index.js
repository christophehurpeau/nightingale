import AbstractHandler from 'nightingale-handler';
import formatterRaw from 'nightingale-raw-formatter';

export default class StringHandler extends AbstractHandler {
    /**
     * @param {int} minLevel
     */
    constructor(minLevel) {
        super(minLevel, formatterRaw);

        this._buffer = '';
        this.write = (string) => {
            this._buffer += string;
            this._buffer += '\n';
        };

    }

    get string() {
        return this._buffer;
    }
}
