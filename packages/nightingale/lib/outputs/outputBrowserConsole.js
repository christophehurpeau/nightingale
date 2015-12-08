'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.write = undefined;

var _LogLevel = require('../LogLevel');

var _LogLevel2 = _interopRequireDefault(_LogLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const write = exports.write = (() => {
    if (console.error) {
        return function write(params, logLevel) {
            const log = console[logLevel >= _LogLevel2.default.ERROR ? 'error' : 'log'].bind(console);
            log(...params);
        };
    } else {
        return function write(params, logLevel) {
            const log = console.log.bind(console);
            log(...params);
        };
    }
})(); /* eslint no-console: 0 */
//# sourceMappingURL=outputBrowserConsole.js.map