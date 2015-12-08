"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class LayoutDefault {
    constructor(formatter) {
        this.formatter = formatter;
    }

    format(record) {
        return this.formatter.format(record);
    }
}
exports.default = LayoutDefault;
//# sourceMappingURL=LayoutBrowserConsole.js.map