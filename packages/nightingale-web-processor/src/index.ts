import { IncomingMessage } from 'http';
import type { LogRecord } from 'nightingale-types';

export interface ContextWithOptionalRequest {
  request?: IncomingMessage;
}

export default function webProcessor<T>(
  record: LogRecord<T>,
  context?: ContextWithOptionalRequest,
): void {
  const request = context?.request;
  if (request) {
    record.extra = record.extra || {};
    record.extra.url = request.url;
    record.extra.method = request.method;
    record.extra.server = request.headers.host;
    record.extra.ip =
      request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  }
}
