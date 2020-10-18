/* eslint-disable no-console */
import { POB_TARGET } from 'pob-babel';
import Level from 'nightingale-levels';
import type { LogRecord, Metadata } from 'nightingale-types';

export default function consoleOutput<T extends Metadata>(
  param: string | string[],
  record: LogRecord<T>,
): void {
  if (POB_TARGET !== 'browser') {
    const outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param as string}\n`);
  } else {
    console[record.level >= Level.ERROR ? 'error' : 'log'](...param);
  }
}
