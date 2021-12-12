/* eslint-disable no-console */
import { Level } from 'nightingale-levels';
import type { LogRecord, Metadata } from 'nightingale-types';
import 'pob-babel';

export default function consoleOutput<T extends Metadata>(
  param: string | string[],
  record: LogRecord<T>,
): void {
  if (__POB_TARGET__ !== 'browser') {
    const outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param as string}\n`);
  } else {
    console[record.level >= Level.ERROR ? 'error' : 'log'](...param);
  }
}
