import { Logger } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';
import { ReactNativeConsoleHandler } from 'nightingale-react-native-console';
export { configure, addConfig, Level } from 'nightingale';
export declare const appLogger: Logger;
export declare const ReactNativeConsoleHandlerForPlatform: typeof BrowserConsoleHandler | typeof ReactNativeConsoleHandler;
//# sourceMappingURL=index.d.ts.map