import { Logger, configure, Level } from 'nightingale';
import { BrowserConsoleHandler } from 'nightingale-browser-console';
import { ReactNativeConsoleHandler } from 'nightingale-react-native-console';
// @ts-expect-error including @types/react-native causes conflicts
// eslint-disable-next-line import/no-unresolved
import { Platform } from 'react-native';

export { configure, addConfig } from 'nightingale';

export { Level, ReactNativeConsoleHandler };

export const appLogger = new Logger('app');

export const ReactNativeConsoleHandlerForPlatform:
  | typeof ReactNativeConsoleHandler
  | typeof BrowserConsoleHandler =
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
