'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nightingale = require('nightingale');
var nightingaleReactNativeConsole = require('nightingale-react-native-console');

var appLogger = new nightingale.Logger('app');
nightingale.configure( // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
process.env.NODE_ENV === 'production' ? [] : [{
  pattern: /^app(:|$)/,
  handlers: [new nightingaleReactNativeConsole.ReactNativeConsoleHandler(nightingale.Level.DEBUG)],
  stop: true
}, {
  handlers: [new nightingaleReactNativeConsole.ReactNativeConsoleHandler(nightingale.Level.INFO)]
}]);

exports.Level = nightingale.Level;
exports.addConfig = nightingale.addConfig;
exports.configure = nightingale.configure;
exports.ReactNativeConsoleHandler = nightingaleReactNativeConsole.ReactNativeConsoleHandler;
exports.appLogger = appLogger;
//# sourceMappingURL=index-browser-dev.cjs.js.map
