import Logger from './Logger';
import BrowserConsoleHandler from './handlers/BrowserConsoleHandler';

/**
 * A simplified way of creating a {@link Logger} with a {@link ConsoleHandler}
 */
export default class BrowserConsoleLogger extends Logger {
    /**
     * Creates a new ConsoleLogger with a prefix.
     *
     * If no min level is specified, the min level is ALL if name is in `process.env.DEBUG`, else WARN
     *
     * @param {string} name
     * @param {int} [minLevel]
     */
    constructor(name, minLevel) {
        super([
            new BrowserConsoleHandler(minLevel != null ? minLevel : name),
        ]);

        this.setPrefix(`[${name}]`);
    }
}
