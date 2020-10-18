'use strict';

const Logger = require('nightingale');
const consoleOutput = require('nightingale-console-output');
const jsonFormatter = require('nightingale-json-formatter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);
const consoleOutput__default = /*#__PURE__*/_interopDefaultLegacy(consoleOutput);
const jsonFormatter__default = /*#__PURE__*/_interopDefaultLegacy(jsonFormatter);

class JSONHandler {
  constructor(minLevel) {
    this.minLevel = minLevel;
  }

  handle(record) {
    consoleOutput__default(jsonFormatter__default(record), record);
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
//# sourceMappingURL=jsonConsole-node10.cjs.js.map
