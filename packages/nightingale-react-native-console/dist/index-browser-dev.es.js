import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';

const createHandle = () => {
  return record => {
    return consoleOutput([formatterANSI(record)], record);
  };
};

class ReactNativeConsoleHandler {
  constructor(minLevel) {
    this.minLevel = 0;
    this.minLevel = minLevel;

    this.isHandling = level => level >= minLevel;

    this.handle = createHandle();
  }

}

export { ReactNativeConsoleHandler };
//# sourceMappingURL=index-browser-dev.es.js.map
