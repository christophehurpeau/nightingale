import { Logger, configure, Level } from 'nightingale';
import { ReactNativeConsoleHandler } from 'nightingale-react-native-console';

export { configure, addConfig } from 'nightingale';

export { Level, ReactNativeConsoleHandler };

export const appLogger = new Logger('app');

configure(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (process as any).env.NODE_ENV === 'production'
    ? []
    : [
        {
          pattern: /^app(:|$)/,
          handlers: [new ReactNativeConsoleHandler(Level.DEBUG)],
          stop: true,
        },
        {
          handlers: [new ReactNativeConsoleHandler(Level.INFO)],
        },
      ],
);
