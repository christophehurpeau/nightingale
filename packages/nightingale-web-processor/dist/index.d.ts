/// <reference types="node" />
import { IncomingMessage } from 'http';
import { Record } from 'nightingale-types';
export interface ContextWithOptionalRequest {
    request?: IncomingMessage;
}
export default function webProcessor<T>(record: Record<T>, context?: ContextWithOptionalRequest): void;
