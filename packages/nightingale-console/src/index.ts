import { POB_TARGET } from 'pob-babel';
import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';
import formatterJSON from 'nightingale-json-formatter';
import Level from 'nightingale-levels';
import type { IsHandling, Handle, LogRecord } from 'nightingale-types';

const defaultFormatter =
  POB_TARGET === 'node' &&
  !process.stdout.isTTY &&
  process.env.NIGHTINGALE_CONSOLE_FORMATTER !== 'ansi'
    ? formatterJSON
    : formatterANSI;

const createHandle = (
  formatter = defaultFormatter,
  output = consoleOutput,
): Handle => {
  return <T>(record: LogRecord<T>): void => {
    return output(formatter(record), record);
  };
};
const findDebugLevel = createFindDebugLevel(process.env.DEBUG);

interface ConsoleHandlerOptions {
  formatter?: <T>(record: LogRecord<T>) => string;
  output?: <T>(param: string | string[], record: LogRecord<T>) => void;
}

export default class ConsoleHandler {
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
