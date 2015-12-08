/* eslint no-console: 0 */
import LogLevel from '../LogLevel';

export const write = (() => {
    if (console.error) {
        return function write(params, logLevel) {
            const log = console[logLevel >= LogLevel.ERROR ? 'error' : 'log'].bind(console);
            log(...params);
        };
    } else {
        return function write(params, logLevel) {
            const log = console.log.bind(console);
            log(...params);
        };
    }
})();
