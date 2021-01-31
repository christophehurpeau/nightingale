import type { Level, Handle, IsHandling } from 'nightingale-types';
declare type Theme = 'light' | 'dark';
interface BrowserConsoleHandlerOptions {
    theme?: Theme;
}
export default class BrowserConsoleHandler {
    minLevel: Level;
    handle: Handle;
    isHandling: IsHandling;
    constructor(minLevel: Level, options?: BrowserConsoleHandlerOptions);
}
export {};
//# sourceMappingURL=index.d.ts.map