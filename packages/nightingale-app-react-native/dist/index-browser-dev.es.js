import { Platform } from 'react-native';
import { Logger, configure, Level } from 'nightingale';
export { Level, addConfig, configure } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';
import { ReactNativeConsoleHandler } from 'nightingale-react-native-console';
export { ReactNativeConsoleHandler } from 'nightingale-react-native-console';

// @ts-expect-error including @types/react-native causes conflicts
const appLogger = new Logger('app');
const ReactNativeConsoleHandlerForPlatform = // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Platform.OS === 'web' ? BrowserConsoleHandler : ReactNativeConsoleHandler;
configure(process.env.NODE_ENV === 'production' ? [] : [{
  pattern: /^app(:|$)/,
  handlers: [new ReactNativeConsoleHandlerForPlatform(Level.DEBUG)],
  stop: true
}, {
  handlers: [new ReactNativeConsoleHandlerForPlatform(Level.INFO)]
}]);

export { ReactNativeConsoleHandlerForPlatform, appLogger };
//# sourceMappingURL=index-browser-dev.es.js.map
