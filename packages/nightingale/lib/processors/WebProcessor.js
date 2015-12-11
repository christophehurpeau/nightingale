'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
let WebProcessor = class WebProcessor {
    constructor(request) {
        this.request = request;
    }

    process(record) {
        record.extra = record.extra || {};
        record.extra.url = this.request.url;
        record.extra.method = this.request.method;
        record.extra.server = this.request.headers.host;
        record.extra.referrer = this.request.referrer;
        record.extra.ip = this.request.headers['x-forwarded-for'] || this.request.connection.remoteAddress;
    }
};
exports.default = WebProcessor;
//# sourceMappingURL=WebProcessor.js.map