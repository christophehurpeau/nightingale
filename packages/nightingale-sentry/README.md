<h3 align="center">
  nightingale-sentry
</h3>

<p align="center">
  Sentry handler for nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-sentry"><img src="https://img.shields.io/npm/v/nightingale-sentry.svg?style=flat-square"></a>
</p>

## Install

```sh
npm install --save nightingale nightingale-sentry
```

## Usage

```js
import { configure, Level } from 'nightingale';
import SentryHandler from 'nightingale-sentry';

configure([
  {
    handlers: [
      new SentryHandler(process.env.SENTRY_DSN, Level.ERROR, {
        // getUser: ({ context }) => context.user && { id: context.user.id },
        // getTags: ({ context }) => context.tags,
      }),
    ],
  },
]);
```
