import levelNames from 'nightingale-level-names';
import t from 'flow-runtime';

/* eslint camelcase:"off" */
const WinstonTransportType = t.type('WinstonTransportType', t.object(t.property('log', t.function())));


function WinstonAdapterHandler(winstonTransport, minLevel) {
  let _minLevelType = t.number();

  t.param('winstonTransport', WinstonTransportType).assert(winstonTransport);
  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = minLevel;
  this.handle = record => new Promise((resolve, reject) => {
    winstonTransport.log(record.level, record.message, {
      level_name: levelNames.get(record.level),
      key: record.key,
      metadata: record.metadata,
      extra: record.extra,
      context: record.context
    }, err => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

export default WinstonAdapterHandler;
//# sourceMappingURL=index-node8-dev.es.js.map
