import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';
import { IsHandling, Handle, Record, Level } from 'nightingale-types';

const handle: Handle = <T>(record: Record<T>) => consoleOutput(formatterANSI(record), record);
const findDebugLevel = createFindDebugLevel(process.env.DEBUG);

export default class ConsoleHandler {
  minLevel: Level = Level.ALL;
  isHandling: IsHandling;
  handle: Handle;

  constructor(minLevel: Level) {
    this.isHandling = (level: Level, key: string) => level >= findDebugLevel(minLevel, key);
    this.handle = handle;
  }
}
