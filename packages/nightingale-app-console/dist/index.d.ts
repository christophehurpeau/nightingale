import Logger, { Level, levels } from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';
import TerminalConsoleHandler from 'nightingale-console';
export { configure, addConfig } from 'nightingale';
export declare const ConsoleHandler: typeof BrowserConsoleHandler | typeof TerminalConsoleHandler;
export { Level, levels };
export declare const logger: Logger;
export declare const appLogger: Logger;
//# sourceMappingURL=index.d.ts.map