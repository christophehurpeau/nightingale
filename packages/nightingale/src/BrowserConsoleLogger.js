import Logger from './Logger';
import BrowserConsoleHandler from './handlers/BrowserConsoleHandler';

/**
 * A simplified way of creating a {@link Logger} with a {@link ConsoleHandler}
 */
export default class BrowserConsoleLogger extends Logger {
    /**
     * Creates a new ConsoleLogger with a prefix.
     *
     * the min level is ALL if name is in `process.env.DEBUG`
     *
     * @param {string} name
     * @param {int} [defaultMinLevel] default is WARN
     */
    constructor(name, defaultMinLevel) {
        super([
            new BrowserConsoleHandler(defaultMinLevel, name),
        ]);

        if (name) {
            this.setPrefix(`[${name}]`);
        }
    }
}
