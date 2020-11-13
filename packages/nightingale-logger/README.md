<h3 align="center">
  nightingale-logger
</h3>

<p align="center">
  Logger for browser and node
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-logger"><img src="https://img.shields.io/npm/v/nightingale-logger.svg?style=flat-square"></a>
</p>

## nightingale

To see the full documentation, go to https://christophehurpeau.github.io/nightingale/modules/nightingale.html

To see the Logger API, go to https://christophehurpeau.github.io/nightingale/classes/nightingale_logger.logger.html

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
