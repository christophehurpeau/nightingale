import levelNames from 'nightingale-level-names';
import t from 'flow-runtime';

/* eslint camelcase:"off" */
var WinstonTransportType = t.type('WinstonTransportType', t.object(t.property('log', t.function())));


function WinstonAdapterHandler(winstonTransport, minLevel) {
  var _minLevelType = t.number();

  t.param('winstonTransport', WinstonTransportType).assert(winstonTransport);
  t.param('minLevel', _minLevelType).assert(minLevel);

  this.minLevel = minLevel;
  this.handle = function (record) {
    return new Promise(function (resolve, reject) {
      winstonTransport.log(record.level, record.message, {
        level_name: levelNames.get(record.level),
        key: record.key,
        metadata: record.metadata,
        extra: record.extra,
        context: record.context
      }, function (err) {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  };
}

export default WinstonAdapterHandler;
//# sourceMappingURL=index-browser-dev.es.js.map
