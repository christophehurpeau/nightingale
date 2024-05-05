<h3 align="center">
  nightingale-web-processor
</h3>

<p align="center">
  Nightingale web processor
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-web-processor"><img src="https://img.shields.io/npm/v/nightingale-web-processor.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-web-processor"><img src="https://img.shields.io/npm/dw/nightingale-web-processor.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-web-processor"><img src="https://img.shields.io/node/v/nightingale-web-processor.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-web-processor"><img src="https://img.shields.io/npm/types/nightingale-web-processor.svg?style=flat-square"></a>
</p>

## Install

```bash
npm install --save nightingale-web-processor
```

## Usage

```js
import Koa from "koa";
import webProcessor from "nightingale-web-processor";

configure([
  {
    key: "app",
    handlers: [new ConsoleHandler(Level.ALL)],
    processors: [webProcessor],
  },
]);

const app = new Koa();

app.use((ctx, next) => {
  ctx.logger = appLogger.context({ request: ctx.req });
  return next();
});

app.use(async (ctx) => {
  ctx.logger.info("got request !");
  ctx.body = "ok";
});
```
