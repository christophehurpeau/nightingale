import { Logger, Level } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';
import { ReactNativeConsoleHandler } from 'nightingale-react-native-console';
export { configure, addConfig } from 'nightingale';
export { Level, ReactNativeConsoleHandler };
export declare const appLogger: Logger;
export declare const ReactNativeConsoleHandlerForPlatform: typeof ReactNativeConsoleHandler | typeof BrowserConsoleHandler;
//# sourceMappingURL=index.d.ts.map