/* eslint-disable prefer-template */
import formatterRaw from 'nightingale-raw-formatter';
import type { Level, LogRecord } from 'nightingale-types';

export default class StringHandler {
  readonly minLevel: Level;

  private _buffer = '';

  constructor(minLevel: Level) {
    this.minLevel = minLevel;
  }

  get string(): string {
    return this._buffer;
  }

  handle<T>(record: LogRecord<T>): void {
    this._buffer += formatterRaw(record) + '\n';
  }
}
