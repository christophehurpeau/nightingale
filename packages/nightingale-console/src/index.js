import formatterANSI from 'nightingale-ansi-formatter/src';
import consoleOutput from 'nightingale-console-output/src';
import createFindDebugLevel from 'nightingale-debug/src';

const handle = (record: Object) => consoleOutput(formatterANSI(record), record);
const findDebugLevel = createFindDebugLevel(process.env.DEBUG);

export default function ConsoleHandler(minLevel: number) {
  this.minLevel = 0;
  this.handle = handle;
  this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);
}
