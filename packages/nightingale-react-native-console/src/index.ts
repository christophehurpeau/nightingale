import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';
import type {
  Level,
  Handle,
  IsHandling,
  LogRecord,
  Metadata,
  Handler,
} from 'nightingale-types';

const createHandle = (): Handle => {
  return <T extends Metadata>(record: LogRecord<T>): void => {
    return consoleOutput([formatterANSI(record)], record);
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
