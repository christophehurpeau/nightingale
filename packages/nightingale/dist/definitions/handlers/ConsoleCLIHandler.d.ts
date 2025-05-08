import { Level } from "nightingale-levels";
import type { Handle, Handler, IsHandling } from "nightingale-types";
export interface ConsoleCLIHandlerOptions {
    json?: boolean;
    noColor?: boolean;
}
export declare class ConsoleCLIHandler implements Handler {
    minLevel: Level;
    isHandling: IsHandling;
    handle: Handle;
    constructor(minLevel: Level, options?: ConsoleCLIHandlerOptions);
}
//# sourceMappingURL=ConsoleCLIHandler.d.ts.map