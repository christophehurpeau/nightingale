<h3 align="center">
  nightingale-unit-testing
</h3>

<p align="center">
  nightingale default config for unit testing
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-unit-testing"><img src="https://img.shields.io/npm/v/nightingale-unit-testing.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-unit-testing"><img src="https://img.shields.io/npm/dw/nightingale-unit-testing.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-unit-testing"><img src="https://img.shields.io/node/v/nightingale-unit-testing.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-unit-testing"><img src="https://img.shields.io/npm/types/nightingale-unit-testing.svg?style=flat-square"></a>
</p>

## Install

```sh
npm install --save-dev nightingale-unit-testing
```

## Display a library logs

In your source file, use [nightingale-logger](https://www.npmjs.com/package/nightingale-logger).

In `test-setup` for example:

```js
import "nightingale-unit-testing";
```

By default, only log above 'ERROR' are displayed

When running test, use `DEBUG` to show all logs.

Example with jest:

```bash
DEBUG='my-lib' npm test
```

You can also use `NIGHTINGALE_LIB_MIN_LEVEL` to change the default level of log (but applies to every libraries). See [nightingale-levels](https://www.npmjs.com/package/nightingale-levels) to know what values can be used.

```bash
# display all logs above 'INFO'
NIGHTINGALE_LIB_MIN_LEVEL=200 npm test
```

You can of course also combine the two

```bash
# display all logs above 'INFO', unless it's `my-lib` for which all logs are displayed
NIGHTINGALE_LIB_MIN_LEVEL=200 DEBUG='my-lib' npm test
```

## Logging in tests

```js
import { testLogger } from "nightingale-unit-testing";

it("should test something", () => {
  const value = "hello world";
  testLogger.inspectValue(value);
  expect(value).toBe("hello world");
});
```

By default, only log above 'DEBUG' are displayed in DEV and above 'INFO' in PRODUCTION (`process.env.NODE_ENV === 'production'`)
