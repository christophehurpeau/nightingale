import formatterANSI from 'nightingale-ansi-formatter';
import type {
  Level,
  Handle,
  IsHandling,
  LogRecord,
  Metadata,
  Handler,
} from 'nightingale-types';

function consoleOutput<T extends Metadata>(
  param: string | string[],
  record: LogRecord<T>,
): void {
  // eslint-disable-next-line no-console
  console.log(...param);
}

const createHandle = (): Handle => {
  return <T extends Metadata>(record: LogRecord<T>): void => {
    consoleOutput([formatterANSI(record)], record);
  };
};

export class ReactNativeConsoleHandler implements Handler {
  minLevel: Level = 0;

  handle: Handle;

  isHandling: IsHandling;

  constructor(minLevel: Level) {
    this.minLevel = minLevel;
    this.isHandling = (level: Level) => level >= minLevel;
    this.handle = createHandle();
  }
}
