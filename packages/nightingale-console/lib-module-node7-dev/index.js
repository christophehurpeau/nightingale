import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';

import t from 'flow-runtime';
const handle = record => {
  let _recordType = t.object();

  t.param('record', _recordType).assert(record);
  return consoleOutput(formatterANSI(record), record);
};
const findDebugLevel = createFindDebugLevel(process.env.DEBUG);

export default function ConsoleHandler(minLevel) {
  let _minLevelType = t.number();

  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);
}
//# sourceMappingURL=index.js.map