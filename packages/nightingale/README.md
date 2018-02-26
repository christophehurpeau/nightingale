# nightingale [![NPM version][npm-image]][npm-url]

Logger for browser and node

[![Build Status][circleci-status-image]][circleci-status-url]
[![Travis Status][travisci-status-image]][travisci-status-url]
[![Dependency ci Status][dependencyci-image]][dependencyci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coverage-image]][coverage-url]
[![Doclets Link][doclets-image]][doclets-url]

## Nightingale

The nightingale is a bird best known for its powerful and beautiful song.

See the [Logger API](http://nightingalejs.github.io/nightingale-logger/docs/Logger.html)

## Install

```sh
npm install --save nightingale
npm install --save nightingale-console # for console handler in nodejs
npm install --save nightingale-browser-console # for console handler in browser
```

You can also use [nightingale-app-console](https://www.npmjs.com/package/nightingale-app-console).

## How to use

### In an application

```sh
npm install --save nightingale nightingale-console
```

```js
import Logger, { configure, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

configure([
    {
        handlers: [new ConsoleHandler(levels.WARN)],
    },
    {
        keys: ['mylib', 'myotherlib'],
        handlers: [new ConsoleHandler(levels.ALL)],
    },
    {
        pattern: /^app\.server$/,
        handlers: [new ConsoleHandler(levels.ALL)],
        stop: true, // means the following config won't be used, if the pattern matches.
    },
    {
        pattern: /^app(?!\.server)/,
        handlers: [new ConsoleHandler(levels.INFO)],
    },
]);

// in one of your controllers
const logger = new Logger('app.controllers');
logger.debug('This is a log'); // will not be displayed

// in your server.js file
const logger = new Logger('app.server');
logger.debug('This is a log'); // will be displayed
```

You can configure several handlers with different `levels`, like console and slack.

### In a library

```sh
npm install --save nightingale-logger
```

```js
import Logger from 'nightingale-logger';

const logger = new Logger('mylib');

logger.info('This is a log');
logger.warn('This is a warning !');
logger.success('It works !');
```

### In the browser

```sh
npm install --save nightingale nightingale-browser-console
```

![browser log example](https://static.hurpeau.com/images/npm/nightingale/log_in_firefox.png)

```js
import { configure, levels } from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';

configure([
    {
        key: 'app',
        handlers: [new BrowserConsoleHandler(levels.INFO)],
    }
]);
```

### [Logger](https://nightingalejs.github.io/nightingale-logger/docs/Logger.html)

The class with all the methods you call to log things.

## Debug

```
DEBUG=worker1 node example/debug
```

#### In browser

- via url : `?DEBUG=worker1`
- via localStorage (in a console): `localStorage.DEBUG='worker1'`

Values are minimatch patterns and separated by `,`.

## Processors

### Add information on a request

```js
import Koa from 'koa';
import Logger, { configure, levels } from 'nightingale';
import ConsoleHandler from 'nightinale-console';
import webProcessor from 'nightinale-web-processor';

const app = new Koa();
const logger = new Logger('app');

configure([
    {
        key: 'app',
        handlers: [new ConsoleHandler(levels.ALL)],
        processors: [webProcessor],
    }
])

app.use(async (ctx) => {
    logger.info('something to log !', { context: ctx });
})

app.use(async (ctx) => {
    ctx.logger.info('something to log !', { context: ctx });
})
```

## More info

### Handler

How a log is processed: has a layout and an output.
Also define a minimum level.

You can find handlers [on npm](https://www.npmjs.com/search?q=nightingale-handler)

- [ConsoleHandler](https://npmjs.org/package/nightingale-console)
- [BrowserConsoleHandler](https://npmjs.org/package/nightingale-browser-console)
- [StringHandler](https://npmjs.org/package/nightingale-string)
- [SlackHandler](https://npmjs.org/package/nightingale-slack)

### Formatter

You can find formatters [on npm](https://www.npmjs.com/search?q=nightingale-formatter)

How the record is formatted, with its colors.

- [AnsiFormatter](https://npmjs.org/package/nightingale-ansi-formatter)
- [JsonFormatter](https://npmjs.org/package/nightingale-json-formatter)
- [MarkdownFormatter](https://npmjs.org/package/nightingale-markdown-formatter)

### Output

Where the log is sent: console, file, ...

You can find outputs [on npm](https://www.npmjs.com/search?q=nightingale-output)

- [console](https://npmjs.org/package/nightingale-console-output)
- [file](https://npmjs.org/package/nightingale-file-output)

### Processor

Add extra data in the record

## Extends Logger

```js
import { Logger } from 'nightingale';

class MyCustomLogger extends Logger {
    myCustomMethod(message) {
        return this.info(`custom message: ${message}`);
    }
}

const logger = new MyCustomLogger('app');
```

## Global processors

```js
import { configure } from 'nightingale';
import errorProcessor from 'nightingale-error-processor';

configure([
  { processors: [errorProcessor] }
]);
```

## Global handlers

```js
import { addGlobalHandler, levels } from 'nightingale';
import ErrorHandler from 'nightingale-sentry';

configure([
  { handlers: [new ErrorHandler(levels.ERROR)] }
]);
```

## Children

You can create children.

```js
import Logger from 'nightingale';
const loggerApp = new Logger('app');
const loggerMyService = loggerApp.child('myService');
// loggerMyService key is `app.myService`

```

## Context

You can use context to add data to each log.

```js
import Logger from 'nightingale';
const loggerMyService = new Logger('app.myService');

export function someAction(arg1) {
    const logger = loggerMyService.context({ arg1 });
    logger.info('starting');
    // do stuff
    logger.info('done');
}
```

[npm-image]: https://img.shields.io/npm/v/nightingale.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nightingale
[daviddm-image]: https://david-dm.org/nightingalejs/nightingale.svg?style=flat-square
[daviddm-url]: https://david-dm.org/nightingalejs/nightingale
[dependencyci-image]: https://dependencyci.com/github/nightingalejs/nightingale/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/nightingalejs/nightingale
[circleci-status-image]: https://img.shields.io/circleci/project/nightingalejs/nightingale/master.svg?style=flat-square
[circleci-status-url]: https://circleci.com/gh/nightingalejs/nightingale
[travisci-status-image]: https://img.shields.io/travis/nightingalejs/nightingale/master.svg?style=flat-square
[travisci-status-url]: https://travis-ci.org/nightingalejs/nightingale
[coverage-image]: https://img.shields.io/codecov/c/github/nightingalejs/nightingale/master.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/nightingalejs/nightingale
[docs-coverage-url]: https://nightingalejs.github.io/nightingale/coverage/lcov-report/

[doclets-image]: https://img.shields.io/badge/doclets.io-master-green.svg?style=flat-square
[doclets-url]: https://doclets.io/nightingalejs/nightingale/master
