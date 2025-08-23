<h1 align="center">
  nightingale-logger
</h1>

<p align="center">
  Logger for browser and node
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-logger"><img src="https://img.shields.io/npm/v/nightingale-logger.svg?style=flat-square" alt="npm version"></a>
  <a href="https://npmjs.org/package/nightingale-logger"><img src="https://img.shields.io/npm/dw/nightingale-logger.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.org/package/nightingale-logger"><img src="https://img.shields.io/node/v/nightingale-logger.svg?style=flat-square" alt="node version"></a>
  <a href="https://npmjs.org/package/nightingale-logger"><img src="https://img.shields.io/npm/types/nightingale-logger.svg?style=flat-square" alt="types"></a>
  <a href="https://codecov.io/gh/christophehurpeau/nightingale"><img src="https://img.shields.io/codecov/c/github/christophehurpeau/nightingale/main.svg?style=flat-square"></a>
</p>

## nightingale

To see the full documentation, go to https://www.npmjs.com/package/nightingale

To see the Logger API, go to https://christophehurpeau.github.io/nightingale/classes/nightingale_logger_src.logger.html

## Install

```sh
npm install --save nightingale-logger
```

## Levels

[nightingale-levels](https://www.npmjs.com/package/nightingale-levels)

## Usage

```js
import Logger from "nightingale-logger";

const logger = new Logger("mylib");

logger.info("This is a log");
logger.warn("This is a warning !");
logger.success("It works !");
```
