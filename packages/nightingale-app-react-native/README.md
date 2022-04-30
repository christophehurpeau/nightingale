<h3 align="center">
  nightingale-app-react-native
</h3>

<p align="center">
  React Native and Expo logger for application
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-app-react-native"><img src="https://img.shields.io/npm/v/nightingale-app-react-native.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-app-react-native"><img src="https://img.shields.io/npm/dw/nightingale-app-react-native.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-app-react-native"><img src="https://img.shields.io/node/v/nightingale-app-react-native.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-app-react-native"><img src="https://img.shields.io/npm/types/nightingale-app-react-native.svg?style=flat-square"></a>
</p>

## Install

```sh
npm install --save nightingale-app-react-native
```

## Usage

```js
import { appLogger } from 'nightingale-app-react-native';

appLogger.info('hello');
```

## Create children

```js
const myServiceLogger = appLogger.child('services:myService');
myServiceLogger.debug('started');
```

### The Logger class

See the [Logger API](https://christophehurpeau.github.io/nightingale/classes/nightingale_logger_src.logger.html), with all the methods you call to log things.

## Library

If you're writing a library, use only [nightingale-logger](https://npmjs.org/package/nightingale-logger)

## Change default levels

You can override the config using configure:

```js
import {
  configure,
  ReactNativeConsoleHandler,
  Level,
} from 'nightingale-app-react-native';

configure(
  process.env.NODE_ENV === 'production'
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
```

## Use source maps to display error stack trace

- for browser (expo web or react-native-web), see [nightingale-browser-console](https://npmjs.org/package/nightingale-browser-console)
- for android/ios, [expo-sentry](https://docs.expo.io/guides/using-sentry/#publish-your-app-with-sourcemaps) can send sourcemaps when publishing for production.
