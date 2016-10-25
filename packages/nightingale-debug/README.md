# nightingale-debug [![NPM version][npm-image]][npm-url]

Nightingale console debug

[![Circle ci Status][build-status-image]][build-status-url]
[![Travis ci Status][travisci-status-image]][travisci-status-url]
[![Dependency ci Status][dependencyci-image]][dependencyci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coverage-image]][coverage-url]

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

[npm-image]: https://img.shields.io/npm/v/nightingale-debug.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nightingale-debug
[dependencyci-image]: https://dependencyci.com/github/nightingalejs/nightingale-debug/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/nightingalejs/nightingale-debug
[daviddm-image]: https://david-dm.org/nightingalejs/nightingale-debug.svg?style=flat-square
[daviddm-url]: https://david-dm.org/nightingalejs/nightingale-debug
[build-status-image]: https://img.shields.io/circleci/project/nightingalejs/nightingale-debug/master.svg?style=flat-square
[build-status-url]: https://circleci.com/gh/nightingalejs/nightingale-debug
[travisci-status-image]: https://img.shields.io/travis/nightingalejs/nightingale-debug/master.svg?style=flat-square
[travisci-status-url]: https://travis-ci.org/nightingalejs/nightingale-debug
[coverage-image]: https://img.shields.io/codecov/c/github/nightingalejs/nightingale-debug/master.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/nightingalejs/nightingale-debug
