import { createWriteStream } from 'fs';

export default class OutputFile {
    constructor(path) {
        this._stream = createWriteStream(path);
    }

    write(string) {
        this._stream.write(string);
    }
}
