'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
let LayoutDefault = class LayoutDefault {
    constructor(formatter) {
        this.formatter = formatter;
    }

    format(record) {
        return this.formatter.format(record) + '\n';
    }
};
exports.default = LayoutDefault;
//# sourceMappingURL=LayoutDefault.js.map