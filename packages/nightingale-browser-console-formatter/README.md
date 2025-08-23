<h1 align="center">
  nightingale-browser-console-formatter
</h1>

<p align="center">
  Deprecated: use NightingaleBrowserConsoleFormatter from nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-browser-console-formatter"><img src="https://img.shields.io/npm/v/nightingale-browser-console-formatter.svg?style=flat-square" alt="npm version"></a>
  <a href="https://npmjs.org/package/nightingale-browser-console-formatter"><img src="https://img.shields.io/npm/dw/nightingale-browser-console-formatter.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.org/package/nightingale-browser-console-formatter"><img src="https://img.shields.io/node/v/nightingale-browser-console-formatter.svg?style=flat-square" alt="node version"></a>
  <a href="https://npmjs.org/package/nightingale-browser-console-formatter"><img src="https://img.shields.io/npm/types/nightingale-browser-console-formatter.svg?style=flat-square" alt="types"></a>
  <a href="https://codecov.io/gh/christophehurpeau/nightingale"><img src="https://img.shields.io/codecov/c/github/christophehurpeau/nightingale/main.svg?style=flat-square"></a>
</p>

## Install

```sh
npm install --save nightingale
```

## Usage

```js
import { NightingaleBrowserConsoleFormatter } from "nightingale";

const formatter = new NightingaleBrowserConsoleFormatter("light");
formatter.format(record);
```
