'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var levelNames = require('nightingale-level-names');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var levelNames__default = /*#__PURE__*/_interopDefaultLegacy(levelNames);

/* eslint-disable camelcase */
var WinstonAdapterHandler = function WinstonAdapterHandler(winstonTransport, minLevel) {
  this.minLevel = minLevel;

  this.handle = function (record) {
    // new Promise((resolve, reject) => {
    winstonTransport.log(record.level, record.message, {
      level_name: levelNames__default.get(record.level),
      key: record.key,
      metadata: record.metadata,
      extra: record.extra,
      context: record.context
    }, function (err) {
      if (err) {
        // eslint-disable-next-line no-console
        console.warn(err); // return reject(err);
      } // resolve();

    }); // });
  };
};

exports.WinstonAdapterHandler = WinstonAdapterHandler;
exports.default = WinstonAdapterHandler;
//# sourceMappingURL=index-browser.cjs.js.map
