export default class LayoutDefault {
    constructor(formatter) {
        this.formatter = formatter;
    }

    format(record) {
        return `${this.formatter.format(record)}\n`;
    }
}
