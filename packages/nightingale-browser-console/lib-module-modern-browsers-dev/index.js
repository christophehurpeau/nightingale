import browserConsoleFormatter from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';
import getDebugString from './debug';

// debug string can change any time (localStorage), so we need a new object each time.
import t from 'flow-runtime';
const findDebugLevel = function findDebugLevel(minLevel, key) {
  return createFindDebugLevel(getDebugString())(minLevel, key);
};
const handle = function handle(record) {
  let _recordType = t.object();

  t.param('record', _recordType).assert(record);
  return consoleOutput(browserConsoleFormatter(record), record);
};

export default function BrowserConsoleHandler(minLevel) {
  let _minLevelType = t.number();

  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = function (level, key) {
    return level >= findDebugLevel(minLevel, key);
  };
}
//# sourceMappingURL=index.js.map