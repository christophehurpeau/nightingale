<h3 align="center">
  nightingale-console
</h3>

<p align="center">
  Deprecated: use ConsoleHandler from nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-console"><img src="https://img.shields.io/npm/v/nightingale-console.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-console"><img src="https://img.shields.io/npm/dw/nightingale-console.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-console"><img src="https://img.shields.io/node/v/nightingale-console.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-console"><img src="https://img.shields.io/npm/types/nightingale-console.svg?style=flat-square"></a>
</p>

## Install

```sh
npm install --save nightingale
```

## Usage

```js
import { configure, levels, ConsoleHandler } from "nightingale";

configure([{ handlers: [new ConsoleHandler(Level.INFO)] }]);
```
