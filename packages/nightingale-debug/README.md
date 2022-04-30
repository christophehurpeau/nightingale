<h3 align="center">
  nightingale-debug
</h3>

<p align="center">
  Nightingale debug
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-debug"><img src="https://img.shields.io/npm/v/nightingale-debug.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-debug"><img src="https://img.shields.io/npm/dw/nightingale-debug.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-debug"><img src="https://img.shields.io/node/v/nightingale-debug.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-debug"><img src="https://img.shields.io/npm/types/nightingale-debug.svg?style=flat-square"></a>
  <a href="https://codecov.io/gh/christophehurpeau/nightingale"><img src="https://img.shields.io/codecov/c/github/christophehurpeau/nightingale/master.svg?style=flat-square"></a>
</p>

## Install

```sh
npm install --save nightingale-debug
```

## Used by:

- [nightingale-console](https://npmjs.org/package/nightingale-console)
- [nightingale-browser-console](https://npmjs.org/package/nightingale-browser-console)

## Usage with nodejs

```
DEBUG='*'; # debug everything
DEBUG=app # debug for logger with key 'app'
DEBUG=app:* # debug for logger with key 'app' and all its children
DEBUG=app,nightingale # debug for logger with key 'app' and 'nightingale'
DEBUG=/^app/ # debug for logger with key starting with 'app'
DEBUG=/^(app|nightingale$)/ # debug for logger with key starting with 'app' and key 'nightingale'
DEBUG='*,-app'; # debug everything except app
DEBUG='*,-app:*'; # debug everything except app and all its children
```

## Usage with browser

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
