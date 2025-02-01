import type { Handle, Handler, Level } from "nightingale-types";
export type LogCallback = (err: Error | null) => void;
export interface WinstonTransportType {
    log: (level: number, message: string, metadata: Record<string, unknown>, callback: LogCallback) => void;
}
export declare class WinstonAdapterHandler implements Handler {
    minLevel: Level;
    handle: Handle;
    constructor(winstonTransport: WinstonTransportType, minLevel: Level);
}
//# sourceMappingURL=index.d.ts.map