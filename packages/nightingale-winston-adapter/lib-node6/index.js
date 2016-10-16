'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WinstonAdapterHandler;

var _nightingaleLevelNames = require('nightingale-level-names');

var _nightingaleLevelNames2 = _interopRequireDefault(_nightingaleLevelNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WinstonAdapterHandler(winstonTransport, minLevel) {
  this.minLevel = minLevel;
  this.handle = record => new Promise((resolve, reject) => {
    winstonTransport.log(record.level, record.message, {
      level_name: _nightingaleLevelNames2.default.get(record.level),
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
} /* eslint camelcase:"off" */
//# sourceMappingURL=index.js.map