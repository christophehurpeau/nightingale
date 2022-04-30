<h3 align="center">
  nightingale-browser-console
</h3>

<p align="center">
  Browser console handler for nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-browser-console"><img src="https://img.shields.io/npm/v/nightingale-browser-console.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-browser-console"><img src="https://img.shields.io/npm/dw/nightingale-browser-console.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-browser-console"><img src="https://img.shields.io/node/v/nightingale-browser-console.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-browser-console"><img src="https://img.shields.io/npm/types/nightingale-browser-console.svg?style=flat-square"></a>
</p>

## Install

```sh
npm install --save nightingale-browser-console
```

## Usage

```js
import { configure, levels } from 'nightingale';
import { ConsoleHandler } from 'nightingale-browser-console';

configure([{ handlers: [new ConsoleHandler(Level.INFO)] }]);
```

## Theme

If you have a dark console theme, you can set this config in your localStorage :

```js
localStorage.NIGHTINGALE_THEME = 'dark';
```

You can also force this option:

```js
import { ConsoleHandler } from 'nightingale-browser-console';

configure([{ handlers: [new ConsoleHandler(Level.INFO, { theme: 'dark' })] }]);
```

## Debug

### with localStorage

```js
localStorage.debug = '*'; // debug everything
localStorage.debug = 'app'; // debug for logger with key 'app'
localStorage.debug = 'app,nightingale'; // debug for logger with key 'app' and 'nightingale'
localStorage.debug = '/^app/'; //debug for logger with key starting with 'app'
localStorage.debug = '/^(app|nightingale$)/'; // debug for logger with key starting with 'app' and key 'nightingale'
localStorage.debug = '*,-app'; // debug everything except app
localStorage.debug = '*,-app:*'; // debug everything except app and all its children
```

### with query, in the url

```js
?DEBUG='*'; // debug everything
?DEBUG=app // debug for logger with key 'app'
?DEBUG=app,nightingale // debug for logger with key 'app' and 'nightingale'
?DEBUG=/^app/  // debug for logger with key starting with 'app'
?DEBUG=/^(app|nightingale$)/  // debug for logger with key starting with 'app' and key 'nightingale'
?DEBUG=*,-app // debug everything except app
?DEBUG=*,-app:* // debug everything except app and all its children
```

## Use source maps to display error stack trace

In production:

Send your log to an external tool like [sentry](https://sentry.io/). Sentry allows you to send the source maps after building (if you use webpack, you can use `hidden-source-map` to generate `.map` files, send them to sentry, and remove them so they are not accessible).

In development:

- Configure your build tool to generate sourcemaps. For webpack: use proper [`devtool` configuration](https://webpack.js.org/configuration/devtool/). For best stack trace, use `source-map` but it's the slowest option.
- Make sure your project uses [source-map-support](https://www.npmjs.com/package/source-map-support) or similar tool. If not, you can install and simply import `source-map-support/register`.
