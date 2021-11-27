import { Logger } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';
import { ConsoleHandler as TerminalConsoleHandler } from 'nightingale-console';
export { configure, addConfig, levels, Level } from 'nightingale';
export declare const ConsoleHandler: typeof BrowserConsoleHandler | typeof TerminalConsoleHandler;
export declare const logger: Logger;
export declare const appLogger: Logger;
//# sourceMappingURL=index.d.ts.map