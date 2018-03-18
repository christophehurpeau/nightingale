'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var levelNames = _interopDefault(require('nightingale-level-names'));
var t = _interopDefault(require('flow-runtime'));

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

module.exports = WinstonAdapterHandler;
//# sourceMappingURL=index-browser-dev.cjs.js.map
