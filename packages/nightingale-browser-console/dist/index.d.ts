import type { Level, Handle, IsHandling } from 'nightingale-types';
declare type Theme = 'light' | 'dark';
interface BrowserConsoleHandlerOptions {
    theme?: Theme;
}
export declare class BrowserConsoleHandler {
    minLevel: Level;
    handle: Handle;
    isHandling: IsHandling;
    constructor(minLevel: Level, options?: BrowserConsoleHandlerOptions);
}
/** @deprecated use named export instead */
export default BrowserConsoleHandler;
//# sourceMappingURL=index.d.ts.map