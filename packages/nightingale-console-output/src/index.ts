/* eslint-disable no-console */

import { Record } from 'nightingale-types';
import Level from 'nightingale-levels';

export default <T>(param: string | Array<string>, record: Record<T>) => {
  if (process.env.POB_TARGET !== 'browser') {
    const outKey = record.level >= Level.ERROR ? 'stderr' : 'stdout';
    process[outKey].write(`${param as string}\n`);
  } else {
    console[record.level >= Level.ERROR ? 'error' : 'log'](...param);
  }
};
