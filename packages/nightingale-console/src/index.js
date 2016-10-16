import formatterANSI from 'nightingale-ansi-formatter/src';
import consoleOutput from 'nightingale-console-output/src';

const handle = (record: Object) => consoleOutput(formatterANSI(record), record);

export default function ConsoleHandler(minLevel: number) {
  this.minLevel = minLevel;
  this.handle = handle;
}
