import browserConsoleFormatter from 'nightingale-browser-console-formatter';
import consoleOutput from 'nightingale-console-output';

var handle = record => consoleOutput(browserConsoleFormatter(record), record);

export default function BrowserConsoleHandler(minLevel) {
  this.minLevel = minLevel;
  this.handle = handle;
}
//# sourceMappingURL=index.js.map