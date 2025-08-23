import { Level } from "nightingale-levels";
import type { LogRecord, Metadata } from "nightingale-types";

export function consoleOutput<T extends Metadata>(
  param: [string, ...string[]],
  record: LogRecord<T>,
): void {
  const outKey = record.level >= Level.ERROR ? "stderr" : "stdout";
  process[outKey].write(`${param[0]}\n`);
}
