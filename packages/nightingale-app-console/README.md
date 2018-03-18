<h3 align="center">
  nightingale-app-console
</h3>

<p align="center">
  nightingale default config and logger for app
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-app-console"><img src="https://img.shields.io/npm/v/nightingale-app-console.svg?style=flat-square"></a>
  <a href="https://david-dm.org/christophehurpeau/nightingale?path=packages/nightingale-app-console"><img src="https://david-dm.org/christophehurpeau/nightingale?path=packages/nightingale-app-console.svg?style=flat-square"></a>
</p>

## Install

```sh
npm install --save nightingale-app-console
```

## Usage

```js
import { logger } from 'nightingale-app-console';

logger.info('hello');
```

## Create children

```js
const myServiceLogger = logger.child('services:myService');
myServiceLogger.debug('started');
```
