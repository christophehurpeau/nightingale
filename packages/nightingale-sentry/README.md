<h1 align="center">
  nightingale-sentry
</h1>

<p align="center">
  Sentry handler for nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-sentry"><img src="https://img.shields.io/npm/v/nightingale-sentry.svg?style=flat-square" alt="npm version"></a>
  <a href="https://npmjs.org/package/nightingale-sentry"><img src="https://img.shields.io/npm/dw/nightingale-sentry.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.org/package/nightingale-sentry"><img src="https://img.shields.io/node/v/nightingale-sentry.svg?style=flat-square" alt="node version"></a>
  <a href="https://npmjs.org/package/nightingale-sentry"><img src="https://img.shields.io/npm/types/nightingale-sentry.svg?style=flat-square" alt="types"></a>
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
} from "@sentry/node";
import { configure, Level, listenUnhandledErrors } from "nightingale";
import { SentryHandler } from "nightingale-sentry";

listenUnhandledErrors();

sentryInit({
  dsn: process.env.NODE_ENV === "production" ? "__DSN__" : undefined,
  // ...
});

configure([
  {
    handlers: [
      new SentryHandler(
        { addBreadcrumb, captureException, captureMessage },
        Level.ERROR,
        {
          // shouldSendAsException: (record) => record.metadata?.error !== undefined && record.metadata.unhandled !== true,
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
} from "@sentry/browser";
import { addConfig, Level } from "nightingale-app";
import SentryHandler from "nightingale-sentry";

sentryInit({
  dsn: process.env.NODE_ENV === "production" ? "__DSN__" : undefined,
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
} from "@sentry/browser";
import { configure, Level } from "nightingale";
import { SentryHandler } from "nightingale-sentry";

sentryInit({
  dsn: process.env.NODE_ENV === "production" ? "__DSN__" : undefined,
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
            record.level >= Level.ERROR &&
            record.metadata?.error !== undefined &&
            record.metadata.unhandled !== true,
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

## Usage with sentry-expo

At the time of this writing, sentry-expo is still in version `5.28.0` and if you use typescript you might have issues with types due to duplicated version (if you don't use typescript, you might still have duplication so it might still be a good idea to follow this)

I'll use `yarn` here, but npm works similarly (if you use npm, please open a PR to complete this !)
Note that nightingale has a dependency to `@sentry/node` for compatibility reasons.

First, you can check the versions installed:

```
yarn why @sentry/types
yarn why @sentry/core
yarn why @sentry/node
```

You should see something like this:

```
yarn why v1.22.5
[1/4] Why do we have the module "@sentry/types"...?
[2/4] Initialising dependency graph...
[3/4] Finding dependency...
[4/4] Calculating file sizes...
=> Found "@sentry/types@5.28.0"
info Has been hoisted to "@sentry/types"
info Reasons this module exists
   - Hoisted from "@sentry#core#@sentry#types"
   - Hoisted from "@sentry#hub#@sentry#types"
   - Hoisted from "@sentry#minimal#@sentry#types"
   - Hoisted from "@sentry#tracing#@sentry#types"
   - Hoisted from "@sentry#utils#@sentry#types"
   - Hoisted from "@sentry#node#@sentry#types"
   - Hoisted from "sentry-expo#@sentry#types"
   - Hoisted from "sentry-expo#@sentry#browser#@sentry#types"
   - Hoisted from "sentry-expo#@sentry#integrations#@sentry#types"
   - Hoisted from "sentry-expo#@sentry#react-native#@sentry#types"
   - Hoisted from "sentry-expo#@sentry#react-native#@sentry#react#@sentry#types"
info Disk size without dependencies: "1.11MB"
info Disk size with unique dependencies: "1.11MB"
info Disk size with transitive dependencies: "1.11MB"
info Number of shared dependencies: 0
=> Found "nightingale-sentry#@sentry/types@6.1.0"
info Reasons this module exists
   - "nightingale-sentry" depends on it
   - Hoisted from "nightingale-sentry#@sentry#core#@sentry#types"
   - Hoisted from "nightingale-sentry#@sentry#node#@sentry#types"
   - Hoisted from "nightingale-sentry#@sentry#core#@sentry#hub#@sentry#types"
   - Hoisted from "nightingale-sentry#@sentry#core#@sentry#minimal#@sentry#types"
   - Hoisted from "nightingale-sentry#@sentry#node#@sentry#tracing#@sentry#types"
   - Hoisted from "nightingale-sentry#@sentry#core#@sentry#utils#@sentry#types"
info Disk size without dependencies: "1.19MB"
info Disk size with unique dependencies: "1.19MB"
info Disk size with transitive dependencies: "1.19MB"
info Number of shared dependencies: 0
```

If you see only one version, everything is good ! You can skip this.

Now add these in you package's devDependencies:

```
    "@sentry/core": "10.32.1",
    "@sentry/node": "10.32.1",
    "@sentry/types": "10.32.1",
```

If you use yarn 1, also add [`yarn-deduplicate`](https://www.npmjs.com/package/yarn-deduplicate), then run:

```sh
yarn; yarn yarn-deduplicate -s fewer ; yarn yarn-deduplicate ; yarn
```

If you use yarn berry, you have to manually change the yarn.lock to downgrade the 3 sentry dependencies as `yarn dedupe` currently only supports the `highest` strategy.

You should now have:

```
yarn why v1.22.5
[1/4] Why do we have the module "@sentry/types"...?
[2/4] Initialising dependency graph...
[3/4] Finding dependency...
[4/4] Calculating file sizes...
=> Found "@sentry/types@5.28.0"
info Has been hoisted to "@sentry/types"
info Reasons this module exists
   - Specified in "devDependencies"
   - Hoisted from "@sentry#core#@sentry#types"
   - Hoisted from "@sentry#node#@sentry#types"
   - Hoisted from "nightingale-sentry#@sentry#types"
   - Hoisted from "sentry-expo#@sentry#types"
   - Hoisted from "sentry-expo#@sentry#browser#@sentry#types"
   - Hoisted from "@sentry#core#@sentry#hub#@sentry#types"
   - Hoisted from "sentry-expo#@sentry#integrations#@sentry#types"
   - Hoisted from "@sentry#core#@sentry#minimal#@sentry#types"
   - Hoisted from "sentry-expo#@sentry#react-native#@sentry#types"
   - Hoisted from "@sentry#node#@sentry#tracing#@sentry#types"
   - Hoisted from "@sentry#core#@sentry#utils#@sentry#types"
   - Hoisted from "sentry-expo#@sentry#react-native#@sentry#react#@sentry#types"
info Disk size without dependencies: "1.11MB"
info Disk size with unique dependencies: "1.11MB"
info Disk size with transitive dependencies: "1.11MB"
info Number of shared dependencies: 0
Done in 0.78s.
```
