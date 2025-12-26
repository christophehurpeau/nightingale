import { BrowserConsoleHandler, Logger } from "nightingale";
import { ReactNativeConsoleHandler } from "./ReactNativeConsoleHandler.native.ts";
export { ReactNativeConsoleHandler } from "./ReactNativeConsoleHandler.native.ts";
export { configure, addConfig, Level } from "nightingale";
export declare const appLogger: Logger;
export declare const ReactNativeConsoleHandlerForPlatform: typeof BrowserConsoleHandler | typeof ReactNativeConsoleHandler;
export declare function listenReactNativeUnhandledErrors(logger?: Logger): void;
//# sourceMappingURL=index.d.ts.map