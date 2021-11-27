import formatterANSI from 'nightingale-ansi-formatter';

function consoleOutput(param) {
  // eslint-disable-next-line no-console
  console.log(...param);
}

const createHandle = () => {
  return record => {
    consoleOutput([formatterANSI(record)]);
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
//# sourceMappingURL=index-browsermodern.es.js.map
