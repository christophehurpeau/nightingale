/// <reference types="node" />
import { IncomingMessage } from 'http';
import { LogRecord } from 'nightingale-types';
export interface ContextWithOptionalRequest {
    request?: IncomingMessage;
}
export default function webProcessor<T>(record: LogRecord<T>, context?: ContextWithOptionalRequest): void;
//# sourceMappingURL=index.d.ts.map