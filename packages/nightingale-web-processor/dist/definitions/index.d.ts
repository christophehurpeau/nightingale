/// <reference types="node" />
import type { IncomingMessage } from "node:http";
import type { LogRecord, Metadata } from "nightingale-types";
export interface ContextWithOptionalRequest {
    request?: IncomingMessage;
}
export default function webProcessor<T extends Metadata>(record: LogRecord<T>, context?: ContextWithOptionalRequest): void;
//# sourceMappingURL=index.d.ts.map