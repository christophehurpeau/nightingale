'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function webProcessor(record, context) {
  const request = context === null || context === void 0 ? void 0 : context.request;

  if (request) {
    record.extra = record.extra || {};
    Object.assign(record.extra, {
      url: request.url,
      method: request.method,
      server: request.headers.host,
      ip: request.headers['x-forwarded-for'] || request.connection.remoteAddress
    });
  }
}

exports.default = webProcessor;
//# sourceMappingURL=index-node12-dev.cjs.js.map
