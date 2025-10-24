/* eslint-disable prefer-template */
import type { Handler, Level, LogRecord, Metadata } from "nightingale-types";
import { RawFormatter } from "../formatters/RawFormatter.ts";

export class StringHandler implements Handler {
  readonly minLevel: Level;

  private _buffer = "";

  constructor(minLevel: Level) {
    this.minLevel = minLevel;
  }

  get string(): string {
    return this._buffer;
  }

  handle<T extends Metadata>(record: LogRecord<T>): void {
    this._buffer += RawFormatter.format(record)[0] + "\n";
  }
}
