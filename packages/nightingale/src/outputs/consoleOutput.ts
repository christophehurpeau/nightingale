/* eslint-disable no-console */
import { Level } from "nightingale-levels";
import type { LogRecord, Metadata } from "nightingale-types";
import { POB_TARGET } from "pob-babel";

export function consoleOutput<T extends Metadata>(
  param: [string, ...string[]],
  record: LogRecord<T>,
): void {
  if (POB_TARGET !== "browser") {
    const outKey = record.level >= Level.ERROR ? "stderr" : "stdout";
    process[outKey].write(`${param[0]}\n`);
  } else {
    console[record.level >= Level.ERROR ? "error" : "log"](...param);
  }
}
