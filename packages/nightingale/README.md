# nightingale [![NPM version][npm-image]][npm-url]

Logger for browser and node

[![Build Status][build-status-image]][build-status-url] [![Coverage][coverage-image]][coverage-url]

The nightingale is a bird best known for its powerful and beautiful song.

See the [Logger API](http://nightingalejs.github.io/nightingale-logger/docs/Logger.html)

## Install

```
npm install --save nightingale
npm install --save nightingale-console # for console handler
```

## How to use

### In an application

```js
import Logger, { configure, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

configure([
    {
        // no patterns: default
        handlers: [new ConsoleHandler(levels.WARN)],
    },
    {
        patterns: ['mylib', 'myotherlib'],
        handlers: [new ConsoleHandler(levels.ALL)],
    },
    {
        patterns: ['app'],
        handlers: [new ConsoleHandler(levels.INFO)],
    },
    {
        patterns: ['app.server'],
        handlers: [new ConsoleHandler(levels.ALL)],
    },
]);

// in one of your controllers
const logger = new Logger('app.controllers');
logger.debug('This is a log'); // will not be displayed

// in your server.js file
const logger = new Logger('app.server');
logger.debug('This is a log'); // will be displayed
```

`app.server` overrides the `app` config. [minimatch](https://www.npmjs.com/package/minimatch) is used.
You can configure several handlers with different `levels`, like console and slack.

### In an library

```js
import Logger from 'nightingale-logger';

const logger = new Logger('mylib');

logger.info('This is a log');
logger.warn('This is a warning !');
logger.success('It works !');
```

### How to use on browser

![browser log example](https://static.hurpeau.com/images/npm/nightingale/log_in_firefox.png)

```js
import { configure, logLevels } from 'nightingale';
import BrowserConsoleHandler from 'nightingale-browser-console';

configure([
    {
        patterns: ['app'],
        handlers: [new BrowserConsoleHandler(logLevels.INFO)],
    }
]);
```


### [Logger](http://christophehurpeau.github.io/nightingale/docs/Logger.html)

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
        patterns: ['app'],
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
- [FileHandler](https://npmjs.org/package/nightingale-file)
- [SlackHandler](https://npmjs.org/package/nightingale-slack)

### Formatter

You can find formatters [on npm](https://www.npmjs.com/search?q=nightingale-formatter)

How the a record is formatted, with its colors.

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
import { addGlobalProcessor } from 'nightingale';
import errorProcessor from 'nightingale-error-processor';

addGlobalProcessor(errorProcessor);
```

## Global handlers

```js
import { addGlobalHandler, levels } from 'nightingale';
import ErrorHandler from 'nightingale-sentry';

addGlobalHandler(new ErrorHandler(levels.ERROR));
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
[build-status-image]: https://img.shields.io/circleci/project/nightingalejs/nightingale/master.svg?style=flat-square
[build-status-url]: https://circleci.com/gh/nightingalejs/nightingale
[coverage-image]: https://img.shields.io/coveralls/nightingalejs/nightingale/master.svg?style=flat-square
[coverage-url]: http://nightingalejs.github.io/nightingale/coverage/lcov-report/
