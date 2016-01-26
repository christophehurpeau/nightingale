"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
let LayoutBrowserConsole = class LayoutBrowserConsole {
    /**
     * @param formatter
    */
    constructor(formatter) {
        this.formatter = formatter;
    }

    /**
     * @param record
    */format(record) {
        return this.formatter.format(record);
    }
};
exports.default = LayoutBrowserConsole;
//# sourceMappingURL=LayoutBrowserConsole.js.map