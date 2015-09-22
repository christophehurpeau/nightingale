export default class LayoutHTML {
    constructor(formatter) {
        this.formatter = formatter;
    }

    format(record) {
        return '</div>' + this.formatter.format(record) + '</div>\n';
    }
}
