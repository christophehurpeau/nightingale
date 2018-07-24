/* eslint-disable prefer-template */
import { Level, Record } from 'nightingale-types';
import formatterRaw from 'nightingale-raw-formatter';

export default class StringHandler {
  readonly minLevel: Level;

  private _buffer = '';

  constructor(minLevel: Level) {
    this.minLevel = minLevel;
  }

  get string() {
    return this._buffer;
  }

  handle<T>(record: Record<T>) {
    this._buffer += formatterRaw(record) + '\n';
  }
}
