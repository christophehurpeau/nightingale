<h1 align="center">
  nightingale-browser-console
</h1>

<p align="center">
  Deprecated: use BrowserConsoleHandler from nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-browser-console"><img src="https://img.shields.io/npm/v/nightingale-browser-console.svg?style=flat-square" alt="npm version"></a>
  <a href="https://npmjs.org/package/nightingale-browser-console"><img src="https://img.shields.io/npm/dw/nightingale-browser-console.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.org/package/nightingale-browser-console"><img src="https://img.shields.io/node/v/nightingale-browser-console.svg?style=flat-square" alt="node version"></a>
  <a href="https://npmjs.org/package/nightingale-browser-console"><img src="https://img.shields.io/npm/types/nightingale-browser-console.svg?style=flat-square" alt="types"></a>
</p>

## Install

```sh
npm install --save nightingale
```

## Usage

```js
import { configure, levels, BrowserConsoleHandler } from "nightingale";

configure([{ handlers: [new BrowserConsoleHandler(Level.INFO)] }]);
```
