# nightingale-winston-adapter [![NPM version][npm-image]][npm-url]

Winston adapter handler for nightingale

## Install

```
npm install --save nightingale nightingale-winston-adapter
npm install --save winston-logstash # example with winston-logstash
```

## How to use

```js
import { addGlobalHandler, levels } from 'nightingale';
import WinstonAdapterHandler from 'nightingale-winston-adapter';
import LogStash from 'winston-logstash';

// create transport
const logmaticTransport = new Logstash({
    port: 0000,
    host: 'api.logmatic.io',
    meta: { logmaticKey:'xxxxxxxx' },
    node_name: 'my node name',
});

// add the transport as a nightingale handler for all loggers
addGlobalHandler(new WinstonAdapterHandler(logmaticTransport, levels.ALL));
```

[npm-image]: https://img.shields.io/npm/v/nightingale-winston-adapter.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nightingale-winston-adapter
