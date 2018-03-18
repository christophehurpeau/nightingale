'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = require('nightingale');
var Logger__default = _interopDefault(Logger);
var jsonFormatter = _interopDefault(require('nightingale-json-formatter'));
var consoleOutput = _interopDefault(require('nightingale-console-output'));

var handle = function handle(record) {
  return consoleOutput(jsonFormatter(record), record);
};

function JSONHandler() {
  this.minLevel = 0;
  this.handle = handle;
}

Logger.configure([{
  handlers: [new JSONHandler(Logger.levels.ALL)]
}]);

var logger = new Logger__default('app');

logger.log('test');

var timeStarted = logger.time();
setTimeout(function () {
  return logger.timeEnd(timeStarted, 'time measured');
}, 2000);

logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
//# sourceMappingURL=jsonConsole-node4.cjs.js.map
