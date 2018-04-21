function webProcessor(record, context) {
  const request = context && context.request;

  if (request) {
    record.extra = record.extra || {};
    record.extra.url = request.url;
    record.extra.method = request.method;
    record.extra.server = request.headers.host;
    record.extra.ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  }
}

export default webProcessor;
//# sourceMappingURL=index-node8-dev.es.js.map
