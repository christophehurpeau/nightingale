import browserConsoleFormatter from 'nightingale-browser-console-formatter/src';
import consoleOutput from 'nightingale-console-output/src';
import createFindDebugLevel from 'nightingale-debug/src';
import getDebugString from './debug';

// debug string can change any time (localStorage), so we need a new object each time.
const findDebugLevel = (minLevel, key) => createFindDebugLevel(getDebugString())(minLevel, key);
const handle = (record: Object) => consoleOutput(browserConsoleFormatter(record), record);

export default function BrowserConsoleHandler(minLevel: number) {
  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);
}
