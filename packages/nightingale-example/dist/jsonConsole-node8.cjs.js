'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var jsonFormatter = _interopDefault(require('nightingale-json-formatter'));
var consoleOutput = _interopDefault(require('nightingale-console-output'));

class JSONHandler {
  constructor(minLevel) {
    this.minLevel = minLevel;
  }

  handle(record) {
    consoleOutput(jsonFormatter(record), record);
  }

}

Logger.configure([{
  handlers: [new JSONHandler(Logger.Level.ALL)]
}]);
const logger = new Logger__default('app');
logger.log('test');
const timeStarted = logger.time();
setTimeout(() => logger.timeEnd(timeStarted, 'time measured'), 2000);
logger.success('Listening', {
  port: 3000
}, {
  port: ['yellow']
});
//# sourceMappingURL=jsonConsole-node8.cjs.js.map
