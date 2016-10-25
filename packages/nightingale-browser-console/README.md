# nightingale-browser-console [![NPM version][npm-image]][npm-url]

Browser console handler for nightingale

[![Dependency Status][daviddm-image]][daviddm-url]

## Install

```sh
npm install --save nightingale-browser-console
```

## Usage

```js
import { configure, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-browser-console';

configure([
  { handlers: [new ConsoleHandler(levels.INFO)] }
]);
```

## Debug

### with localStorage

```
localStorage.debug = '*'; // debug everything
localStorage.debug = 'app'; // debug for logger with key 'app'
localStorage.debug = 'app,nightingale'; // debug for logger with key 'app' and 'nightingale'
localStorage.debug = '/^app/';  //debug for logger with key starting with 'app'
localStorage.debug = '/^(app|nightingale$)/';  // debug for logger with key starting with 'app' and key 'nightingale'
localStorage.debug = '*,-app'; // debug everything except app
localStorage.debug = '*,-app:*'; // debug everything except app and all its children
```

### with query, in the url

```
?DEBUG='*'; // debug everything
?DEBUG=app // debug for logger with key 'app'
?DEBUG=app,nightingale // debug for logger with key 'app' and 'nightingale'
?DEBUG=/^app/  // debug for logger with key starting with 'app'
?DEBUG=/^(app|nightingale$)/  // debug for logger with key starting with 'app' and key 'nightingale'
?DEBUG=*,-app // debug everything except app
?DEBUG=*,-app:* // debug everything except app and all its children
```

[npm-image]: https://img.shields.io/npm/v/nightingale-browser-console.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nightingale-browser-console
[daviddm-image]: https://david-dm.org/nightingalejs/nightingale-browser-console.svg?style=flat-square
[daviddm-url]: https://david-dm.org/nightingalejs/nightingale-browser-console
