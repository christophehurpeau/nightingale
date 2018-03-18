'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var levelNames = _interopDefault(require('nightingale-level-names'));

/* eslint camelcase:"off" */

function WinstonAdapterHandler(winstonTransport, minLevel) {
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

module.exports = WinstonAdapterHandler;
//# sourceMappingURL=index-node8.cjs.js.map
