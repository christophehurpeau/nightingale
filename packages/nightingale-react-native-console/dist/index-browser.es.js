import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';

var createHandle = function createHandle() {
  return function (record) {
    return consoleOutput([formatterANSI(record)], record);
  };
};

var ReactNativeConsoleHandler = function ReactNativeConsoleHandler(minLevel) {
  this.minLevel = 0;
  this.minLevel = minLevel;

  this.isHandling = function (level) {
    return level >= minLevel;
  };

  this.handle = createHandle();
};

export { ReactNativeConsoleHandler };
//# sourceMappingURL=index-browser.es.js.map
