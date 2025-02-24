<h1 align="center">
  nightingale-app-console
</h1>

<p align="center">
  nightingale default config and logger for app
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-app-console"><img src="https://img.shields.io/npm/v/nightingale-app-console.svg?style=flat-square" alt="npm version"></a>
  <a href="https://npmjs.org/package/nightingale-app-console"><img src="https://img.shields.io/npm/dw/nightingale-app-console.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.org/package/nightingale-app-console"><img src="https://img.shields.io/node/v/nightingale-app-console.svg?style=flat-square" alt="node version"></a>
  <a href="https://npmjs.org/package/nightingale-app-console"><img src="https://img.shields.io/npm/types/nightingale-app-console.svg?style=flat-square" alt="types"></a>
</p>

## Install

```sh
npm install --save nightingale-app-console
```

## Usage

```js
import { appLogger } from "nightingale-app-console";

appLogger.info("hello");
```

## Create children

```js
const myServiceLogger = appLogger.child("services:myService");
myServiceLogger.debug("started");
```

### The Logger class

See the [Logger API](https://christophehurpeau.github.io/nightingale/classes/nightingale_logger_src.logger.html), with all the methods you call to log things.

## Library

If you're writing a library, use only [nightingale-logger](https://npmjs.org/package/nightingale-logger)

## Import the right bundle with webpack

Configure `webpackConfig.resolve.mainFields`:

- node: `env === 'production' ? ['module:node', 'module', 'main'] : ['module:node-dev', 'module:node', 'module-dev', 'module', 'main']`
- browser: `env === 'production' ? ['browser', 'module', 'main'] : ['browser-dev', 'browser', 'module-dev', 'module', 'main']`
- modern browser: `env === 'production' ? ['module:modern-browsers', 'browser', 'module', 'main'] : ['module:modern-browsers-dev','module:modern-browsers', 'browser-dev', 'browser', 'module', 'main']`

## Change default levels

Default level for app (appLogger and children): in production, `Level.INFO` () else `Level.DEBUG`
Default level for lib: `Level.INFO`

You can use `process.env.NIGHTINGALE_APP_MIN_LEVEL` and `process.env.NIGHTINGALE_LIB_MIN_LEVEL` to change theses levels.

```
NIGHTINGALE_APP_MIN_LEVEL=0 node .
```

## Use source maps to display error stack trace

- for browser, see [nightingale-browser-console](https://npmjs.org/package/nightingale-browser-console)
- for node, see [nightingale-console](https://npmjs.org/package/nightingale-console)
