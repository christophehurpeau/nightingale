import { Logger, configure, Level } from 'nightingale';
export { Level, addConfig, configure } from 'nightingale';
import { ReactNativeConsoleHandler } from 'nightingale-react-native-console';
export { ReactNativeConsoleHandler } from 'nightingale-react-native-console';

const appLogger = new Logger('app');
configure( // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
process.env.NODE_ENV === 'production' ? [] : [{
  pattern: /^app(:|$)/,
  handlers: [new ReactNativeConsoleHandler(Level.DEBUG)],
  stop: true
}, {
  handlers: [new ReactNativeConsoleHandler(Level.INFO)]
}]);

export { appLogger };
//# sourceMappingURL=index-browser-dev.es.js.map
