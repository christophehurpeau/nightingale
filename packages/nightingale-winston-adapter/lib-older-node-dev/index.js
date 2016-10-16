'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WinstonAdapterHandler;

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _nightingaleLevelNames = require('nightingale-level-names');

var _nightingaleLevelNames2 = _interopRequireDefault(_nightingaleLevelNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WinstonTransportType = _tcombForked2.default.interface({
  log: _tcombForked2.default.Function
}, 'WinstonTransportType'); /* eslint camelcase:"off" */


function WinstonAdapterHandler(winstonTransport, minLevel) {
  _assert(winstonTransport, WinstonTransportType, 'winstonTransport');

  _assert(minLevel, _tcombForked2.default.Number, 'minLevel');

  this.minLevel = minLevel;
  this.handle = function (record) {
    return new Promise(function (resolve, reject) {
      winstonTransport.log(record.level, record.message, {
        level_name: _nightingaleLevelNames2.default.get(record.level),
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

function _assert(x, type, name) {
  function message() {
    return 'Invalid value ' + _tcombForked2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcombForked2.default.getTypeName(type) + ')';
  }

  if (_tcombForked2.default.isType(type)) {
    if (!type.is(x)) {
      type(x, [name + ': ' + _tcombForked2.default.getTypeName(type)]);

      _tcombForked2.default.fail(message());
    }
  } else if (!(x instanceof type)) {
    _tcombForked2.default.fail(message());
  }

  return x;
}
//# sourceMappingURL=index.js.map