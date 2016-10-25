import browserConsoleFormatter from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';
import getDebugString from './debug';

// debug string can change any time (localStorage), so we need a new object each time.
var findDebugLevel = (minLevel, key) => createFindDebugLevel(getDebugString())(minLevel, key);
var handle = record => consoleOutput(browserConsoleFormatter(record), record);

export default function BrowserConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);
}
//# sourceMappingURL=index.js.map