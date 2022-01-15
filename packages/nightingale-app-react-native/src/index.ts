import { Logger, configure, Level } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';
import { ReactNativeConsoleHandler } from 'nightingale-react-native-console';
import { Platform } from 'react-native';

export { configure, addConfig, Level } from 'nightingale';

export const appLogger = new Logger('app');

export const ReactNativeConsoleHandlerForPlatform:
  | typeof ReactNativeConsoleHandler
  | typeof BrowserConsoleHandler =
  Platform.OS === 'web' ? BrowserConsoleHandler : ReactNativeConsoleHandler;

configure(
  process.env.NODE_ENV === 'production'
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
      ],
);
