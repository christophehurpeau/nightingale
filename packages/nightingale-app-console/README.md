# nightingale-app-console [![NPM version][npm-image]][npm-url]

nightingale default config and logger for app

[![Dependency ci Status][dependencyci-image]][dependencyci-url]
[![Dependency Status][daviddm-image]][daviddm-url]

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

[npm-image]: https://img.shields.io/npm/v/nightingale-app-console.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nightingale-app-console
[daviddm-image]: https://david-dm.org/nightingalejs/nightingale-app-console.svg?style=flat-square
[daviddm-url]: https://david-dm.org/nightingalejs/nightingale-app-console
[dependencyci-image]: https://dependencyci.com/github/nightingalejs/nightingale-app-console/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/nightingalejs/nightingale-app-console
