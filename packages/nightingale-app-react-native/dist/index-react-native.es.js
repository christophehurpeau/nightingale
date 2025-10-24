import { Logger, BrowserConsoleHandler, configure, Level } from 'nightingale';
export { Level, addConfig, configure } from 'nightingale';
import { ReactNativeConsoleHandler } from 'nightingale-react-native-console';
import { Platform } from 'react-native';

const appLogger = new Logger("app");
const ReactNativeConsoleHandlerForPlatform = Platform.OS === "web" ? BrowserConsoleHandler : ReactNativeConsoleHandler;
configure(
  process.env.NODE_ENV === "production" ? [] : [
    {
      pattern: /^app(:|$)/,
      handlers: [new ReactNativeConsoleHandlerForPlatform(Level.DEBUG)],
      stop: true
    },
    {
      handlers: [new ReactNativeConsoleHandlerForPlatform(Level.INFO)]
    }
  ]
);
function listenReactNativeUnhandledErrors(logger = new Logger(
  "nightingale:listenReactNativeUnhandledErrors",
  "UnhandledErrors"
)) {
  if (globalThis.HermesInternal.hasPromise?.() && globalThis.HermesInternal.enablePromiseRejectionTracker) {
    globalThis.HermesInternal.enablePromiseRejectionTracker({
      allRejections: true,
      onUnhandled: (id, rejection) => {
        logger.error(rejection, {
          unhandled: true,
          type: "promiseRejectionTracker",
          id
        });
      }
    });
  } else {
    throw new Error("Only Hermes is supported.");
  }
  const globalHandler = ErrorUtils.getGlobalHandler();
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    if (isFatal) {
      logger.fatal(error, { unhandled: true, type: "globalHandler", isFatal });
    } else {
      logger.error(error, { unhandled: true, type: "globalHandler", isFatal });
    }
    if (globalHandler) {
      globalHandler(error, isFatal);
    }
  });
}

export { ReactNativeConsoleHandlerForPlatform, appLogger, listenReactNativeUnhandledErrors };
//# sourceMappingURL=index-react-native.es.js.map
