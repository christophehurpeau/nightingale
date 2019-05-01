/* eslint-disable no-console */
import { POB_TARGET } from 'pob-babel';
import { LogRecord } from 'nightingale-types';
import Level from 'nightingale-levels';

export default function consoleOutput<T>(
  param: string | string[],
  record: LogRecord<T>,
) {
  if (POB_TARGET !== 'browser') {
    const outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param as string}\n`);
  } else {
    console[record.level >= Level.ERROR ? 'error' : 'log'](...param);
  }
}
