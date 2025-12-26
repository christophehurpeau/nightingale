import { ANSIFormatter, Logger, BrowserConsoleHandler, configure, Level } from 'nightingale';
export { Level, addConfig, configure } from 'nightingale';
import { Platform } from 'react-native';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const getStackTrace = (e) => {
  if (Platform.hasOwnProperty("constants")) {
    if (Platform.constants.reactNativeVersion.minor >= 64) {
      return parseErrorStack(e.stack);
    } else return parseErrorStack(e);
  } else return parseErrorStack(e);
};
function parsedStackToString(stack) {
  return stack.map(
    (frame) => `  at ${frame.file ?? "unknown"}${frame.lineNumber ? `:${frame.lineNumber}${frame.column ? `:${frame.column}` : ""}` : ""}${frame.methodName ? ` in ${frame.methodName}` : ""}`
  ).join("\n");
}
function consoleOutput(param, record) {
  console.log(...param);
}
const createHandle = () => {
  return (record) => {
    const metadataError = record.metadata?.error;
    if (metadataError && metadataError instanceof Error) {
      symbolicateStackTrace(getStackTrace(metadataError)).then(({ stack, codeFrame }) => {
        metadataError.stack = parsedStackToString(stack);
        consoleOutput(ANSIFormatter.format(record));
      }).catch((error) => {
        metadataError.stack = void 0;
        consoleOutput(ANSIFormatter.format(record));
      });
    } else {
      consoleOutput(ANSIFormatter.format(record));
    }
  };
};
class ReactNativeConsoleHandler {
  constructor(minLevel) {
    this.minLevel = 0;
    this.minLevel = minLevel;
    this.isHandling = (level) => level >= minLevel;
    this.handle = createHandle();
  }
}

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
  const HermesInternal = global.HermesInternal;
  if (HermesInternal?.hasPromise?.() && HermesInternal.enablePromiseRejectionTracker) {
    HermesInternal.enablePromiseRejectionTracker({
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

export { ReactNativeConsoleHandler, ReactNativeConsoleHandlerForPlatform, appLogger, listenReactNativeUnhandledErrors };
//# sourceMappingURL=index-node22.mjs.map
