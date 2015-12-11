'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
let LayoutHTML = class LayoutHTML {
    constructor(formatter) {
        this.formatter = formatter;
    }

    format(record) {
        return '</div>' + this.formatter.format(record) + '</div>\n';
    }
};
exports.default = LayoutHTML;
//# sourceMappingURL=LayoutHTML.js.map