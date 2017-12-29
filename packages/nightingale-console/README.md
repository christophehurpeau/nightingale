# nightingale-console [![NPM version][npm-image]][npm-url]

Console handler for nightingale

[![Dependency Status][daviddm-image]][daviddm-url]
[![Dependency ci Status][dependencyci-image]][dependencyci-url]

## Install

```sh
npm install --save nightingale nightingale-console
```

## Usage

```js
import { configure, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

configure([
  { handlers: [new ConsoleHandler(levels.INFO)] }
]);
```

## Debug

`DEBUG=* node .`

```
DEBUG='*'; # debug everything
DEBUG=app # debug for logger with key 'app'
DEBUG=app:* # debug for logger with key 'app' and all its children
DEBUG=app,nightingale # debug for logger with key 'app' and 'nightingale'
DEBUG=/^app/ # debug for logger with key starting with 'app'
DEBUG=/^(app|nightingale$)/ # debug for logger with key starting with 'app' and key 'nightingale'
DEBUG='*,-app'; # debug everything except app
DEBUG='*,-app:*'; # debug everything except app and all its children
```

[npm-image]: https://img.shields.io/npm/v/nightingale-console.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nightingale-console
[daviddm-image]: https://david-dm.org/nightingalejs/nightingale-console.svg?style=flat-square
[daviddm-url]: https://david-dm.org/nightingalejs/nightingale-console
[dependencyci-image]: https://dependencyci.com/github/nightingalejs/nightingale-console/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/nightingalejs/nightingale-console
