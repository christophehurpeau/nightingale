import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';
import { createFindDebugLevel } from 'nightingale-debug';
import formatterJSON from 'nightingale-json-formatter';
import { Level } from 'nightingale-levels';
import type {
  IsHandling,
  Handle,
  LogRecord,
  Metadata,
  Handler,
} from 'nightingale-types';

const defaultFormatter =
  __POB_TARGET__ === 'node' &&
  !process.stdout.isTTY &&
  process.env.NIGHTINGALE_CONSOLE_FORMATTER !== 'ansi'
    ? formatterJSON
    : formatterANSI;

const createHandle = (
  formatter = defaultFormatter,
  output = consoleOutput,
): Handle => {
  return <T extends Metadata>(record: LogRecord<T>): void => {
    output(formatter(record), record);
  };
};
const findDebugLevel = createFindDebugLevel(process.env.DEBUG);

interface ConsoleHandlerOptions {
  formatter?: <T extends Metadata>(record: LogRecord<T>) => string;
  output?: <T extends Metadata>(
    param: string | string[],
    record: LogRecord<T>,
  ) => void;
  // compat with nightingale-app-console, not used yet
  theme?: 'dark' | 'light';
}

export class ConsoleHandler implements Handler {
  minLevel: Level = Level.ALL;

  isHandling: IsHandling;

  handle: Handle;

  constructor(minLevel: Level, options: ConsoleHandlerOptions = {}) {
    this.minLevel = minLevel;
    this.isHandling = (level: Level, key: string) =>
      level >= findDebugLevel(minLevel, key);
    this.handle = createHandle(options.formatter, options.output);
  }
}

/** @deprecated use named export instead */
export default ConsoleHandler;
