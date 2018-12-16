import Logger, { configure, Level } from 'nightingale';
import jsonFormatter from 'nightingale-json-formatter';
import consoleOutput from 'nightingale-console-output';

class JSONHandler {
  constructor(minLevel) {
    this.minLevel = minLevel;
  }

  handle(record) {
    consoleOutput(jsonFormatter(record), record);
  }

}

configure([{
  handlers: [new JSONHandler(Level.ALL)]
}]);
const logger = new Logger('app');
logger.log('test');
const timeStarted = logger.time();
setTimeout(() => logger.timeEnd(timeStarted, 'time measured'), 2000);
logger.success('Listening', {
  port: 3000
}, {
  port: ['yellow']
});
//# sourceMappingURL=jsonConsole-node10-dev.es.js.map
