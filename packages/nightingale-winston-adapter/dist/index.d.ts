import type { Level, Handle } from 'nightingale-types';
export declare type LogCallback = (err: Error | null) => void;
export interface WinstonTransportType {
    log: (level: number, message: string, metadata: Record<string, unknown>, callback: LogCallback) => void;
}
export default class WinstonAdapterHandler {
    minLevel: Level;
    handle: Handle;
    constructor(winstonTransport: WinstonTransportType, minLevel: number);
}
//# sourceMappingURL=index.d.ts.map