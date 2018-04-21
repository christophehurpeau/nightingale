<h3 align="center">
  nightingale-logger
</h3>

<p align="center">
  Logger for browser and node
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-logger"><img src="https://img.shields.io/npm/v/nightingale-logger.svg?style=flat-square"></a>
  <a href="https://circleci.com/gh/christophehurpeau/nightingale"><img src="https://img.shields.io/circleci/project/christophehurpeau/nightingale/master.svg?style=flat-square"></a>
  <a href="https://david-dm.org/christophehurpeau/nightingale?path=packages/nightingale-logger"><img src="https://david-dm.org/christophehurpeau/nightingale?path=packages/nightingale-logger.svg?style=flat-square"></a>
  <a href="https://codecov.io/gh/christophehurpeau/nightingale"><img src="https://img.shields.io/codecov/c/github/christophehurpeau/nightingale/master.svg?style=flat-square"></a>
</p>

## nightingale

To see the full documentation, go to [nightingalejs/nightingale](https://github.com/nightingalejs/nightingale)

To see the Logger API, go to [docklets][docklets-url] or [http://nightingalejs.github.io/nightingale-logger](http://nightingalejs.github.io/nightingale-logger/docs/Logger.html)

## Install

```sh
npm install --save nightingale-logger
```

## Levels

[nightingale-Levels](https://www.npmjs.com/package/nightingale-Levels)

## Usage

```js
import Logger from 'nightingale-logger';

const logger = new Logger('mylib');

logger.info('This is a log');
logger.warn('This is a warning !');
logger.success('It works !');
```
