import findLevel from 'nightingale-debug';

/**
 * @param {int} minLevel
 * @param {Function} formatter
 * @param {Function} output
 */
export default class Handler {
    constructor(minLevel, formatter, output) {
        this.minLevel = findLevel(minLevel);
        this.format = formatter;
        this.write = output;
    }

    /**
     * @param {Object} record
     */
    handle(record) {
        const formatted = this.format(record);
        this.write(formatted, record);
    }

    isHandling(level) {
        return level >= this.minLevel;
    }
}
