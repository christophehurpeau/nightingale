import browserConsoleFormatter from 'nightingale-browser-console-formatter/src';
import consoleOutput from 'nightingale-console-output/src';

const handle = (record: Object) => consoleOutput(browserConsoleFormatter(record), record);

export default function BrowserConsoleHandler(minLevel: number) {
  this.minLevel = minLevel;
  this.handle = handle;
}
