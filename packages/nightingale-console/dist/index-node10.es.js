import formatterANSI from 'nightingale-ansi-formatter';
import consoleOutput from 'nightingale-console-output';
import createFindDebugLevel from 'nightingale-debug';
import { Level } from 'nightingale-types';

const handle = record => consoleOutput(formatterANSI(record), record);

const findDebugLevel = createFindDebugLevel(process.env.DEBUG);
class ConsoleHandler {
  constructor(minLevel) {
    this.minLevel = Level.ALL;
    this.isHandling = void 0;
    this.handle = void 0;
    this.minLevel = minLevel;

    this.isHandling = (level, key) => level >= findDebugLevel(minLevel, key);

    this.handle = handle;
  }

}

export default ConsoleHandler;
//# sourceMappingURL=index-node10.es.js.map
