import { Logger, configure, Level } from "nightingale";
import { BrowserConsoleHandler } from "nightingale-browser-console";
import { ReactNativeConsoleHandler } from "nightingale-react-native-console";
import { Platform } from "react-native";

export { configure, addConfig, Level } from "nightingale";

export const appLogger = new Logger("app");

export const ReactNativeConsoleHandlerForPlatform:
  | typeof BrowserConsoleHandler
  | typeof ReactNativeConsoleHandler =
  Platform.OS === "web" ? BrowserConsoleHandler : ReactNativeConsoleHandler;

configure(
  process.env.NODE_ENV === "production"
    ? []
    : [
        {
          pattern: /^app(:|$)/,
          handlers: [new ReactNativeConsoleHandlerForPlatform(Level.DEBUG)],
          stop: true,
        },
        {
          handlers: [new ReactNativeConsoleHandlerForPlatform(Level.INFO)],
        },
      ]
);

export function listenReactNativeUnhandledErrors(
  logger: Logger = new Logger(
    "nightingale:listenReactNativeUnhandledErrors",
    "UnhandledErrors"
  )
): void {
  // Check if Hermes is available and is being used for promises
  // React Native v0.63 and v0.64 include global.HermesInternal but not 'hasPromise'
  if (
    global?.HermesInternal?.hasPromise?.() &&
    global.HermesInternal.enablePromiseRejectionTracker
  ) {
    global.HermesInternal.enablePromiseRejectionTracker({
      allRejections: true,
      onUnhandled: (id: number, rejection: Error) => {
        logger.error(rejection, {
          unhandled: true,
          type: "promiseRejectionTracker",
          id,
        });
      },
    });
  } else {
    throw new Error("Only Hermes is supported.");
  }

  const globalHander = ErrorUtils.getGlobalHandler();

  ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
    if (isFatal) {
      logger.fatal(error, { unhandled: true, type: "globalHandler", isFatal });
    } else {
      logger.error(error, { unhandled: true, type: "globalHandler", isFatal });
    }

    if (globalHander) {
      globalHander(error, isFatal);
    }
  });
}
