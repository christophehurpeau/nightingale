<h3 align="center">
  nightingale
</h3>

<p align="center">
  Logger for browser and node
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale"><img src="https://img.shields.io/npm/v/nightingale.svg?style=flat-square"></a>
</p>

## Nightingale

The nightingale is a bird best known for its powerful and beautiful song.

See the [Logger API](https://christophehurpeau.github.io/nightingale/classes/nightingale_logger.logger.html)

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
import Logger, { configure, Level } from 'nightingale';
import ConsoleHandler from 'nightingale-console';

configure([
  {
    handlers: [new ConsoleHandler(Level.WARN)],
  },
  {
    keys: ['mylib', 'myotherlib'],
    handlers: [new ConsoleHandler(Level.ALL)],
  },
  {
    pattern: /^app\.server$/,
    handlers: [new ConsoleHandler(Level.ALL)],
    stop: true, // means the following config won't be used, if the pattern matches.
  },
  {
    pattern: /^app(?!\.server)/,
    handlers: [new ConsoleHandler(Level.INFO)],
  },
]);

// in one of your controllers
const logger = new Logger('app.controllers');
logger.debug('This is a log'); // will not be displayed

// in your server.js file
const logger = new Logger('app.server');
logger.debug('This is a log'); // will be displayed
```

You can configure several handlers with different `Level`, like console and slack.

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
    handlers: [new BrowserConsoleHandler(Level.INFO)],
  },
]);
```

### [Logger](https://christophehurpeau.github.io/nightingale/classes/nightingale_logger_src.logger.html)

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
import Logger, { configure, Level } from 'nightingale';
import ConsoleHandler from 'nightinale-console';
import webProcessor from 'nightinale-web-processor';

const app = new Koa();
const logger = new Logger('app');

configure([
  {
    key: 'app',
    handlers: [new ConsoleHandler(Level.ALL)],
    processors: [webProcessor],
  },
]);

app.use(async (ctx) => {
  logger.info('something to log !', { context: ctx });
});

app.use(async (ctx) => {
  ctx.logger.info('something to log !', { context: ctx });
});
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
- [ReactNativeConsoleHandler](https://npmjs.org/package/nightingale-react-native-console)

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
import errorProcessor from './myErrorProcessor';

configure([{ processors: [errorProcessor] }]);
```

## Global handlers

```js
import { addGlobalHandler, levels } from 'nightingale';
import ErrorHandler from 'nightingale-sentry';

configure([{ handlers: [new ErrorHandler(Level.ERROR)] }]);
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
