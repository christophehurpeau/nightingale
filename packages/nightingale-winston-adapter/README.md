# nightingale-winston-adapter [![NPM version][npm-image]][npm-url]

Winston adapter handler for nightingale

[![Dependency ci Status][dependencyci-image]][dependencyci-url]
[![Dependency Status][daviddm-image]][daviddm-url]

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
[daviddm-image]: https://david-dm.org/nightingalejs/nightingale-winston-adapter.svg?style=flat-square
[daviddm-url]: https://david-dm.org/nightingalejs/nightingale-winston-adapter
[dependencyci-image]: https://dependencyci.com/github/nightingalejs/nightingale-winston-adapter/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/nightingalejs/nightingale-winston-adapter
