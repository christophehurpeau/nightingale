import { Level, Handle, IsHandling, Record } from 'nightingale-types';
import browserConsoleFormatter from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';
import getDebugString from './debug';

// debug string can change any time (localStorage), so we need a new object each time.
const findDebugLevel = (minLevel: Level, key: string) =>
  createFindDebugLevel(getDebugString())(minLevel, key);
const handle: Handle = <T>(record: Record<T>) => {
  consoleOutput(browserConsoleFormatter(record), record);
};

export default class BrowserConsoleHandler {
  minLevel: Level = 0;
  handle: Handle = handle;
  isHandling: IsHandling;

  constructor(minLevel: Level) {
    this.isHandling = (level: Level, key: string) => level >= findDebugLevel(minLevel, key);
  }
}
