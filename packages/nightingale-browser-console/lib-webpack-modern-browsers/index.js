import browserConsoleFormatter from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';
import getDebugString from './debug';

// debug string can change any time (localStorage), so we need a new object each time.
const findDebugLevel = function findDebugLevel(minLevel, key) {
  return createFindDebugLevel(getDebugString())(minLevel, key);
};
const handle = function handle(record) {
  return consoleOutput(browserConsoleFormatter(record), record);
};

export default function BrowserConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
}
//# sourceMappingURL=index.js.map