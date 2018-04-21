'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function webProcessor(record, context) {
  var request = context && context.request;

  if (request) {
    record.extra = record.extra || {};
    record.extra.url = request.url;
    record.extra.method = request.method;
    record.extra.server = request.headers.host;
    record.extra.ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  }
}

exports.default = webProcessor;
//# sourceMappingURL=index-node4.cjs.js.map
