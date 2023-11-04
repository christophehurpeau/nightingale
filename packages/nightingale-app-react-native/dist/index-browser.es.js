import { Logger, configure, Level } from 'nightingale';
export { Level, addConfig, configure } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';
import { ReactNativeConsoleHandler } from 'nightingale-react-native-console';
import { Platform } from 'react-native';

var appLogger = new Logger('app');
var ReactNativeConsoleHandlerForPlatform = Platform.OS === 'web' ? BrowserConsoleHandler : ReactNativeConsoleHandler;
configure(process.env.NODE_ENV === 'production' ? [] : [{
  pattern: /^app(:|$)/,
  handlers: [new ReactNativeConsoleHandlerForPlatform(Level.DEBUG)],
  stop: true
}, {
  handlers: [new ReactNativeConsoleHandlerForPlatform(Level.INFO)]
}]);
function listenReactNativeUnhandledErrors(logger) {
  var _global;
  if (logger === void 0) {
    logger = new Logger('nightingale:listenReactNativeUnhandledErrors', 'UnhandledErrors');
  }
  // Check if Hermes is available and is being used for promises
  // React Native v0.63 and v0.64 include global.HermesInternal but not 'hasPromise'
  if ((_global = global) != null && (_global = _global.HermesInternal) != null && _global.hasPromise != null && _global.hasPromise() && global.HermesInternal.enablePromiseRejectionTracker) {
    global.HermesInternal.enablePromiseRejectionTracker({
      allRejections: true,
      onUnhandled: function onUnhandled(id, rejection) {
        logger.error(rejection, {
          unhandled: true,
          type: 'promiseRejectionTracker',
          id: id
        });
      }
    });
  } else {
    throw new Error('Only Hermes is supported.');
  }
  var globalHander = ErrorUtils.getGlobalHandler();
  ErrorUtils.setGlobalHandler(function (error, isFatal) {
    if (isFatal) {
      logger.fatal(error, {
        unhandled: true,
        type: 'globalHandler',
        isFatal: isFatal
      });
    } else {
      logger.error(error, {
        unhandled: true,
        type: 'globalHandler',
        isFatal: isFatal
      });
    }
    if (globalHander) {
      globalHander(error, isFatal);
    }
  });
}

export { ReactNativeConsoleHandlerForPlatform, appLogger, listenReactNativeUnhandledErrors };
//# sourceMappingURL=index-browser.es.js.map
