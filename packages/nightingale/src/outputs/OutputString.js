export default class OutputString {
    constructor() {
        this._buffer = '';
    }

    get string() {
        return this._buffer;
    }

    write(str, logLevel) {
        this._buffer += str;
        return this;
    }
}
