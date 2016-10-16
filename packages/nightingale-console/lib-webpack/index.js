import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';

var handle = function handle(record) {
  return consoleOutput(formatterANSI(record), record);
};

export default function ConsoleHandler(minLevel) {
  this.minLevel = minLevel;
  this.handle = handle;
}
//# sourceMappingURL=index.js.map