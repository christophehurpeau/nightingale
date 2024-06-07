import type { IncomingMessage } from "node:http";
import type { LogRecord, Metadata } from "nightingale-types";

export interface ContextWithOptionalRequest {
  request?: IncomingMessage;
}

export default function webProcessor<T extends Metadata>(
  record: LogRecord<T>,
  context?: ContextWithOptionalRequest,
): void {
  const request = context?.request;
  if (request) {
    record.extra = record.extra || {};
    Object.assign(record.extra, {
      url: request.url,
      method: request.method,
      server: request.headers.host,
      ip:
        request.headers["x-forwarded-for"] || request.connection.remoteAddress,
    });
  }
}
