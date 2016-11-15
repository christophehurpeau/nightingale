# nightingale-sentry [![NPM version][npm-image]][npm-url]

Sentry handler for nightingale

[![Dependency Status][daviddm-image]][daviddm-url]

## Install

```sh
npm install --save nightingale nightingale-sentry
```

## Usage

```js
import { configure, levels } from 'nightingale';
import SentryHandler from 'nightingale-sentry';

configure([
  {
    handlers: [
      new SentryHandler(ravenUrl, levels.ERROR, {
        // getUser: ({ context }) => context.user && { id: context.user.id },
        // getTags: ({ context }) => context.tags,
      }),
    ],
  }
]);
```

[npm-image]: https://img.shields.io/npm/v/nightingale-sentry.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nightingale-sentry
[daviddm-image]: https://david-dm.org/nightingalejs/nightingale-sentry.svg?style=flat-square
[daviddm-url]: https://david-dm.org/nightingalejs/nightingale-sentry
