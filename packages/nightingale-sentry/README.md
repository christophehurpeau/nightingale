<h3 align="center">
  nightingale-sentry
</h3>

<p align="center">
  Sentry handler for nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-sentry"><img src="https://img.shields.io/npm/v/nightingale-sentry.svg?style=flat-square"></a>
  <a href="https://david-dm.org/christophehurpeau/nightingale?path=packages/nightingale-sentry"><img src="https://david-dm.org/christophehurpeau/nightingale?path=packages/nightingale-sentry.svg?style=flat-square"></a>
</p>

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
