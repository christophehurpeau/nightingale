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
import {
  init as sentryInit,
  addBreadcrumb,
  captureException,
  captureMessage,
} from '@sentry/node';
import { configure, Level, listenUnhandledErrors } from 'nightingale';
import SentryHandler from 'nightingale-sentry';

if (process.env.NODE_ENV !== 'production') {
  listenUnhandledErrors();
}

sentryInit({
  dsn: process.env.NODE_ENV === 'production' ? '__DSN__' : undefined,
  // ...
});

configure([
  {
    handlers: [
      new SentryHandler(
        { addBreadcrumb, captureException, captureMessage },
        Level.ERROR,
        {
          // shouldSendAsException: (record) => record.metadata?.error !== undefined,
          // shouldSendAsBreadcrumb: (record) => false,
          // getUser: ({ context }) => context.user && { id: context.user.id },
          // getTags: ({ context }) => context.tags,
        },
      ),
    ],
  },
]);
```

## With nightingale-app-\*

```js
import {
  init as sentryInit,
  addBreadcrumb,
  captureException,
  captureMessage,
} from '@sentry/browser';
import { addConfig, Level } from 'nightingale-app';
import SentryHandler from 'nightingale-sentry';

sentryInit({
  dsn: process.env.NODE_ENV === 'production' ? '__DSN__' : undefined,
  // ...
});

addConfig(
  {
    handlers: [
      new SentryHandler(
        { addBreadcrumb, captureException, captureMessage },
        Level.ERROR,
      ),
    ],
  },
  true,
);
```

## Send Breadcrumbs example

```js
import {
  init as sentryInit,
  addBreadcrumb,
  captureException,
  captureMessage,
} from '@sentry/browser';
import { configure, Level } from 'nightingale';
import SentryHandler from 'nightingale-sentry';

sentryInit({
  dsn: process.env.NODE_ENV === 'production' ? '__DSN__' : undefined,
  // ...
});

configure([
  {
    handlers: [
      new SentryHandler(
        { addBreadcrumb, captureException, captureMessage },
        Level.INFO,
        {
          shouldSendAsException: (record) =>
            record.level >= Level.ERROR && record.metadata?.error !== undefined,
          shouldSendAsBreadcrumb: (record) =>
            record.metadata?.breadcrumb ? true : false,
          getBreadcrumbCategory: (record) =>
            record.metadata?.breadcrumbCategory,
          getBreadcrumbType: (record) => record.metadata?.breadcrumbType,
        },
      ),
    ],
  },
]);
```
