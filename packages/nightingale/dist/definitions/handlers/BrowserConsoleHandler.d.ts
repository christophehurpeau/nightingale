import type { Handle, Handler, IsHandling, Level } from "nightingale-types";
type Theme = "dark" | "light";
export interface BrowserConsoleHandlerOptions {
    theme?: Theme;
}
export declare class BrowserConsoleHandler implements Handler {
    minLevel: Level;
    handle: Handle;
    isHandling: IsHandling;
    constructor(minLevel: Level, options?: BrowserConsoleHandlerOptions);
}
export {};
//# sourceMappingURL=BrowserConsoleHandler.d.ts.map