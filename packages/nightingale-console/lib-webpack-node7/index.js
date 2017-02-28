import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';

const handle = record => consoleOutput(formatterANSI(record), record);
const findDebugLevel = createFindDebugLevel(process.env.DEBUG);

export default function ConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);
}
//# sourceMappingURL=index.js.map