import type { Level, Handle, IsHandling, Handler } from 'nightingale-types';
declare type Theme = 'light' | 'dark';
interface BrowserConsoleHandlerOptions {
    theme?: Theme;
}
export declare class BrowserConsoleHandler implements Handler {
    minLevel: Level;
    handle: Handle;
    isHandling: IsHandling;
    constructor(minLevel: Level, options?: BrowserConsoleHandlerOptions);
}
/** @deprecated use named export instead */
export default BrowserConsoleHandler;
//# sourceMappingURL=index.d.ts.map