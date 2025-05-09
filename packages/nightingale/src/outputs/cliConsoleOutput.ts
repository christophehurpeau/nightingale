/* eslint-disable no-console */
import { Level } from "nightingale-levels";
import type { LogRecord, Metadata } from "nightingale-types";
import { POB_TARGET } from "pob-babel";

export function cliConsoleOutput<T extends Metadata>(
  param: [string, ...string[]],
  record: LogRecord<T>,
): void {
  if (POB_TARGET !== "browser") {
    console[record.level >= Level.ERROR ? "error" : "log"](param[0]);
  } else {
    console[record.level >= Level.ERROR ? "error" : "log"](...param);
  }
}
