import levels from './levels';

/**
 * Abstract class that handles a record.
 *
 * Has a min level to discard record lower that this level.
 */
export default class Handler {
    /**
     * @param {int} minLevel
     * @param {Layout} layout
     * @param {Output} output
     */
    constructor(minLevel, layout, output) {
        this.minLevel = minLevel;
        this.layout = layout;
        this.output = output;

        levels.forEach((level) => {
            if (level.value < minLevel) {
                this[level.lcKey] = function() {};
            }
        });
    }

    /**
     * @param {Object} record
     */
    handle(record) {
        if (record.level < this.minLevel) {
            return;
        }

        const formatted = this.layout.format(record);
        this.output.write(formatted);
    }
}
