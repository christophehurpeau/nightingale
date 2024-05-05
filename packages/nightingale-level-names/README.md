<h3 align="center">
  nightingale-level-names
</h3>

<p align="center">
  Nightingale level values to level names
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-level-names"><img src="https://img.shields.io/npm/v/nightingale-level-names.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-level-names"><img src="https://img.shields.io/npm/dw/nightingale-level-names.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-level-names"><img src="https://img.shields.io/node/v/nightingale-level-names.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/nightingale-level-names"><img src="https://img.shields.io/npm/types/nightingale-level-names.svg?style=flat-square"></a>
</p>

## Install

```bash
npm install --save nightingale-level-names
```

## Usage

```js
import Level from "nightingale-Levels";
import levelNames from "nightingale-level-names";

console.log(levelNames.get(Level.TRACE));
console.log(levelNames.get(Level.DEBUG));
console.log(levelNames.get(Level.INFO));
console.log(levelNames.get(Level.WARN));
console.log(levelNames.get(Level.ERROR));
console.log(levelNames.get(Level.CRITICAL));
console.log(levelNames.get(Level.FATAL));
console.log(levelNames.get(Level.ALERT));
console.log(levelNames.get(Level.EMERGENCY));
```
