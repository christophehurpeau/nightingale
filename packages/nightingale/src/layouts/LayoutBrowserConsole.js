export default class LayoutBrowserConsole {
    constructor(formatter) {
        this.formatter = formatter;
    }

    format(record) {
        return this.formatter.format(record);
    }
}
