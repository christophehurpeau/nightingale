'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var levelNames = _interopDefault(require('nightingale-level-names'));

/* eslint camelcase:"off" */
class WinstonAdapterHandler {
  constructor(winstonTransport, minLevel) {
    this.minLevel = void 0;
    this.handle = void 0;
    this.minLevel = minLevel;

    this.handle = record => {
      // new Promise((resolve, reject) => {
      winstonTransport.log(record.level, record.message, {
        level_name: levelNames.get(record.level),
        key: record.key,
        metadata: record.metadata,
        extra: record.extra,
        context: record.context
      }, err => {
        if (err) {
          console.warn(err); // return reject(err);
        } // resolve();

      }); // });
    };
  }

}

exports.default = WinstonAdapterHandler;
//# sourceMappingURL=index-node6.cjs.js.map
