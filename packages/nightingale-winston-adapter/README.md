<h3 align="center">
  nightingale-winston-adapter
</h3>

<p align="center">
  Winston adapter handler for nightingale
</p>

<p align="center">
  <a href="https://npmjs.org/package/nightingale-winston-adapter"><img src="https://img.shields.io/npm/v/nightingale-winston-adapter.svg?style=flat-square"></a>
  <a href="https://david-dm.org/christophehurpeau/nightingale?path=packages/nightingale-winston-adapter"><img src="https://david-dm.org/christophehurpeau/nightingale.svg?path=packages/nightingale-winston-adapter?style=flat-square"></a>
</p>

## Install

```
npm install --save nightingale nightingale-winston-adapter
npm install --save winston-logstash # example with winston-logstash
```

## How to use

```js
import { addGlobalHandler, Level } from 'nightingale';
import WinstonAdapterHandler from 'nightingale-winston-adapter';
import LogStash from 'winston-logstash';

// create transport
const logmaticTransport = new Logstash({
  port: 0000,
  host: 'api.logmatic.io',
  meta: { logmaticKey: 'xxxxxxxx' },
  node_name: 'my node name',
});

// add the transport as a nightingale handler for all loggers
addGlobalHandler(new WinstonAdapterHandler(logmaticTransport, Level.ALL));
```
