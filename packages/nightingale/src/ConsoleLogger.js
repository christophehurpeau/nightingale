import Logger from './Logger';
import ConsoleHandler from './handlers/ConsoleHandler';

/**
 * A simplified way of creating a {@link Logger} with a {@link ConsoleHandler}
 *
 *  Creates a new ConsoleLogger with a prefix.
 *
 * If no min level is specified, the min level is ALL if name is in `process.env.DEBUG`, else WARN
 *
 * @param {string} name
 * @param {int} [minLevel]
 */
export default class ConsoleLogger extends Logger {
    constructor(name, minLevel) {
        super([
            new ConsoleHandler(minLevel != null ? minLevel : name),
        ]);

        this.setPrefix(`[${name}]`);
    }
}
