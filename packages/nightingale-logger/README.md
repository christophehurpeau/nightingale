# nightingale-logger [![NPM version][npm-image]][npm-url]

Logger for browser and node

[![Build Status][circleci-status-image]][circleci-status-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Dependency ci Status][dependencyci-image]][dependencyci-url]
[![Coverage percentage][coverage-image]][coverage-url]

## nightingale

To see the full documentation, go to [nightingalejs/nightingale](https://github.com/nightingalejs/nightingale)

To see the Logger API, go to [docklets][docklets-url] or [http://nightingalejs.github.io/nightingale-logger](http://nightingalejs.github.io/nightingale-logger/docs/Logger.html)

## Install

```sh
npm install --save nightingale-logger
```

## Levels

[nightingale-levels](https://www.npmjs.com/package/nightingale-levels)

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
[daviddm-image]: https://david-dm.org/nightingalejs/nightingale-logger.svg?style=flat-square
[daviddm-url]: https://david-dm.org/nightingalejs/nightingale-logger
[dependencyci-image]: https://dependencyci.com/github/nightingalejs/nightingale-logger/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/nightingalejs/nightingale-logger
[circleci-status-image]: https://img.shields.io/circleci/project/nightingalejs/nightingale-logger/master.svg?style=flat-square
[circleci-status-url]: https://circleci.com/gh/nightingalejs/nightingale-logger
[coverage-image]: https://img.shields.io/codecov/c/github/nightingalejs/nightingale-logger/master.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/nightingalejs/nightingale-logger
[docs-coverage-url]: https://nightingalejs.github.io/nightingale-logger/coverage/lcov-report/
