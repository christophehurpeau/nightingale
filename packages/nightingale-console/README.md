<h3 align="center">
  nightingale-console
</h3>

<p align="center">
  Console handler for nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-console"><img src="https://img.shields.io/npm/v/nightingale-console.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-console"><img src="https://img.shields.io/npm/dw/nightingale-console.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-console"><img src="https://img.shields.io/node/v/nightingale-console.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-console"><img src="https://img.shields.io/npm/types/nightingale-console.svg?style=flat-square"></a>
</p>

## Install

```sh
npm install --save nightingale nightingale-console
```

## Usage

```js
import { configure, levels } from 'nightingale';
import { ConsoleHandler } from 'nightingale-console';

configure([{ handlers: [new ConsoleHandler(Level.INFO)] }]);
```

## Debug

`DEBUG=* node .`

```js
DEBUG='*'; # debug everything
DEBUG=app # debug for logger with key 'app'
DEBUG=app:* # debug for logger with key 'app' and all its children
DEBUG=app,nightingale # debug for logger with key 'app' and 'nightingale'
DEBUG=/^app/ # debug for logger with key starting with 'app'
DEBUG=/^(app|nightingale$)/ # debug for logger with key starting with 'app' and key 'nightingale'
DEBUG='*,-app'; # debug everything except app
DEBUG='*,-app:*'; # debug everything except app and all its children
```

## Use source maps to display error stack trace

Since node 12.12.0, you can use `--enable-source-maps` while running node.

![error with source maps](https://static.hurpeau.com/images/npm/nightingale/screenshot-errors-with-source-maps.png)
