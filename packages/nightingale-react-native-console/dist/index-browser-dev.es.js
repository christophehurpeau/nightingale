import formatterANSI from 'nightingale-ansi-formatter';

function consoleOutput(param) {
  var _console;

  // eslint-disable-next-line no-console
  (_console = console).log.apply(_console, param);
}

var createHandle = function createHandle() {
  return function (record) {
    consoleOutput([formatterANSI(record)]);
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
//# sourceMappingURL=index-browser-dev.es.js.map
