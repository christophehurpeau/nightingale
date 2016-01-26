"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
let LayoutDefault = class LayoutDefault {
    /**
     * @param formatter
    */
    constructor(formatter) {
        this.formatter = formatter;
    }

    /**
     * @param record
    */format(record) {
        return `${ this.formatter.format(record) }\n`;
    }
};
exports.default = LayoutDefault;
//# sourceMappingURL=LayoutDefault.js.map