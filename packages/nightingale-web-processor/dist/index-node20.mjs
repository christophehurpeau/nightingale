function webProcessor(record, context) {
  const request = context?.request;
  if (request) {
    record.extra = record.extra || {};
    Object.assign(record.extra, {
      url: request.url,
      method: request.method,
      server: request.headers.host,
      ip: request.headers["x-forwarded-for"] || request.connection.remoteAddress
    });
  }
}

export { webProcessor as default };
//# sourceMappingURL=index-node20.mjs.map
