<h1 align="center">
  nightingale-react-native-console
</h1>

<p align="center">
  React Native and Expo handler for nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-react-native-console"><img src="https://img.shields.io/npm/v/nightingale-react-native-console.svg?style=flat-square" alt="npm version"></a>
  <a href="https://npmjs.org/package/nightingale-react-native-console"><img src="https://img.shields.io/npm/dw/nightingale-react-native-console.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.org/package/nightingale-react-native-console"><img src="https://img.shields.io/node/v/nightingale-react-native-console.svg?style=flat-square" alt="node version"></a>
  <a href="https://npmjs.org/package/nightingale-react-native-console"><img src="https://img.shields.io/npm/types/nightingale-react-native-console.svg?style=flat-square" alt="types"></a>
</p>

## Install

```sh
npm install --save nightingale nightingale-react-native-console
```

## Usage

:warn: This logger is meant for dev only.

```js
import { configure, Level } from "nightingale";
import { ReactNativeConsoleHandler } from "nightingale-react-native-console";

configure(
  process.env.NODE_ENV === "production"
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

You can use directly [`nightingale-app-react-native`](https://npmjs.org/package/nightingale-app-react-native) to get this config and an ready to use `appLogger`.
