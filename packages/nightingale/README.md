# nightingale [![NPM version][npm-image]][npm-url]

Logger for browser and node

[![Build Status][build-status-image]][build-status-url] [![Coverage][coverage-image]][coverage-url]

The nightingale is a bird best known for its powerful and beautiful song.

See the [API](http://christophehurpeau.github.io/nightingale/docs/)

### Install

```
npm install --save nightingale
```

### How to use

```js
import { Logger, LogLevel } from 'nightingale';
import ConsoleHandler from 'nightingale/lib/handlers/ConsoleHandler';

const logger = new Logger([ new ConsoleHandler(LogLevel.ALL) ]);
logger.setPrefix('[app]');

// or
import { ConsoleLogger, LogLevel } from 'nightingale';
const logger = new ConsoleLogger('app', LogLevel.ALL);


logger.log('This is a log');
logger.warn('This is a warning !');
logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
```

### How to use on browser

![browser log example](http://static.hurpeau.com/images/npm/nightingale/log_in_firefox.png)

```js
import { Logger, LogLevel } from 'nightingale';
import BrowserConsoleHandler from 'nightingale/lib/handlers/BrowserConsoleHandler';

const logger = new Logger([ new BrowserConsoleHandler(LogLevel.ALL) ]);
logger.setPrefix('[app]');

// or
import { BrowserConsoleLogger, LogLevel } from 'nightingale';
const logger = new BrowserConsoleLogger('app', LogLevel.ALL);

logger.log('This is a log');
logger.warn('This is a warning !');
logger.success('Listening', { port: 3000 }, { port: ['yellow'] });
```


### [Logger](http://christophehurpeau.github.io/nightingale/docs/Logger.html)

The class with all the methods you call to log things. Contains handlers.

### Debug

```
DEBUG=worker1 node example/debug
```

### Handler

How a log is processed: has a layout and an output.
Also define a minimum level.

- [ConsoleHandler](http://christophehurpeau.github.io/nightingale/docs/ConsoleHandler.html)
- [StringHandler](http://christophehurpeau.github.io/nightingale/docs/StringHandler.html)

### Layout

How the log is sent to its output.

### Formatter

How the a line is formatted, with its colors.

### Output

Where the log is sent: console, file, ...

- [OutputString](http://christophehurpeau.github.io/nightingale/docs/OutputString.html)
- [OutputFile](http://christophehurpeau.github.io/nightingale/docs/OutputFile.html)

[npm-image]: https://img.shields.io/npm/v/nightingale.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nightingale
[build-status-image]: https://img.shields.io/circleci/project/christophehurpeau/nightingale/master.svg?style=flat-square
[build-status-url]: https://circleci.com/gh/christophehurpeau/nightingale
[coverage-image]: https://img.shields.io/coveralls/christophehurpeau/nightingale/master.svg?style=flat-square
[coverage-url]: http://christophehurpeau.github.io/nightingale/coverage/lcov-report/
