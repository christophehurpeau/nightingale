import { Level } from "nightingale-levels";
import type { Handle, Handler, IsHandling, LogRecord, Metadata } from "nightingale-types";
import type { NightingaleFormatter } from "../formatter-utils";
export interface ConsoleHandlerOptions {
    formatter?: NightingaleFormatter["format"];
    output?: <T extends Metadata>(param: string[] | string, record: LogRecord<T>) => void;
    theme?: "dark" | "light";
}
export declare class ConsoleHandler implements Handler {
    minLevel: Level;
    isHandling: IsHandling;
    handle: Handle;
    constructor(minLevel: Level, options?: ConsoleHandlerOptions);
}
//# sourceMappingURL=ConsoleHandler.d.ts.map