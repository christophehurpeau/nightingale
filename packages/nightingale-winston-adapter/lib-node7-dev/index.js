'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WinstonAdapterHandler;

var _nightingaleLevelNames = require('nightingale-level-names');

var _nightingaleLevelNames2 = _interopRequireDefault(_nightingaleLevelNames);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint camelcase:"off" */
const WinstonTransportType = _flowRuntime2.default.type('WinstonTransportType', _flowRuntime2.default.object(_flowRuntime2.default.property('log', _flowRuntime2.default.function())));

function WinstonAdapterHandler(winstonTransport, minLevel) {
  let _minLevelType = _flowRuntime2.default.number();

  _flowRuntime2.default.param('winstonTransport', WinstonTransportType).assert(winstonTransport);

  _flowRuntime2.default.param('minLevel', _minLevelType).assert(minLevel);

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
}
//# sourceMappingURL=index.js.map