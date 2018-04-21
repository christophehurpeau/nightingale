import { Level, Record } from 'nightingale-types';
export default class StringHandler {
    readonly minLevel: Level;
    private _buffer;
    constructor(minLevel: Level);
    readonly string: string;
    handle<T>(record: Record<T>): void;
}
