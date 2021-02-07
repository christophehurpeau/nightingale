import type { Level, Handle, Handler } from 'nightingale-types';
export declare type LogCallback = (err: Error | null) => void;
export interface WinstonTransportType {
    log: (level: number, message: string, metadata: Record<string, unknown>, callback: LogCallback) => void;
}
export declare class WinstonAdapterHandler implements Handler {
    minLevel: Level;
    handle: Handle;
    constructor(winstonTransport: WinstonTransportType, minLevel: Level);
}
/** @deprecated use named export instead */
export default WinstonAdapterHandler;
//# sourceMappingURL=index.d.ts.map