/* eslint-disable prefer-template */
import formatterRaw from 'nightingale-raw-formatter';
import type { Handler, Level, LogRecord, Metadata } from 'nightingale-types';

export class StringHandler implements Handler {
  readonly minLevel: Level;

  private _buffer = '';

  constructor(minLevel: Level) {
    this.minLevel = minLevel;
  }

  get string(): string {
    return this._buffer;
  }

  handle<T extends Metadata>(record: LogRecord<T>): void {
    this._buffer += formatterRaw(record) + '\n';
  }
}

/** @deprecated use named export instead */
export default StringHandler;
