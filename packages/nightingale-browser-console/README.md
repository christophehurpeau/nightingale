<h3 align="center">
  nightingale-browser-console
</h3>

<p align="center">
  Browser console handler for nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-browser-console"><img src="https://img.shields.io/npm/v/nightingale-browser-console.svg?style=flat-square"></a>
</p>

## Install

```sh
npm install --save nightingale-browser-console
```

## Usage

```js
import { configure, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-browser-console';

configure([{ handlers: [new ConsoleHandler(Level.INFO)] }]);
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
