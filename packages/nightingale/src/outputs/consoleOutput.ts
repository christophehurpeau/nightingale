/* eslint-disable no-console */
import { Level } from "nightingale-levels";
import type { LogRecord, Metadata } from "nightingale-types";

export function consoleOutput<T extends Metadata>(
  param: [string, ...string[]],
  record: LogRecord<T>,
): void {
  console[record.level >= Level.ERROR ? "error" : "log"](...param);
}
