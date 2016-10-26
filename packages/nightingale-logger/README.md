# nightingale-logger [![NPM version][npm-image]][npm-url]

Logger for browser and node

[![Build Status][build-status-image]][build-status-url]
[![Travis Status][travisci-status-image]][travisci-status-url]
[![Coverage][coverage-image]][coverage-url]
[![API Doc][docklets-image]][docklets-url]

To see the full documentation, go to [nightingalejs/nightingale](https://github.com/nightingalejs/nightingale)

To see the Logger API, go to [docklets][docklets-url] or [http://nightingalejs.github.io/nightingale-logger](http://nightingalejs.github.io/nightingale-logger/docs/Logger.html)

## Install

```sh
npm install --save nightingale-logger
```

## Usage

```js
import Logger from 'nightingale-logger';

const logger = new Logger('mylib');

logger.info('This is a log');
logger.warn('This is a warning !');
logger.success('It works !');
```


[npm-image]: https://img.shields.io/npm/v/nightingale-logger.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nightingale-logger
[build-status-image]: https://img.shields.io/circleci/project/nightingalejs/nightingale-logger/master.svg?style=flat-square
[build-status-url]: https://circleci.com/gh/nightingalejs/nightingale-logger
[travisci-status-image]: https://img.shields.io/travis/nightingalejs/nightingale-logger/master.svg?style=flat-square
[travisci-status-url]: https://travis-ci.org/nightingalejs/nightingale-logger
[coverage-image]: https://codecov.io/gh/nightingalejs/nightingale-logger/branch/master/graph/badge.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/nightingalejs/nightingale-logger
[docklets-image]: https://doclets.io/nightingalejs/nightingale-logger/master.svg
[docklets-url]: https://doclets.io/nightingalejs/nightingale-logger/master
