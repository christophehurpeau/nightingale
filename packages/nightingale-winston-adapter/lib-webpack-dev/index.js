import _t from 'tcomb-forked';
/* eslint camelcase:"off" */
import levelNames from 'nightingale-level-names';

var WinstonTransportType = _t.interface({
  log: _t.Function
}, 'WinstonTransportType');

export default function WinstonAdapterHandler(winstonTransport, minLevel) {
  _assert(winstonTransport, WinstonTransportType, 'winstonTransport');

  _assert(minLevel, _t.Number, 'minLevel');

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

function _assert(x, type, name) {
  function message() {
    return 'Invalid value ' + _t.stringify(x) + ' supplied to ' + name + ' (expected a ' + _t.getTypeName(type) + ')';
  }

  if (_t.isType(type)) {
    if (!type.is(x)) {
      type(x, [name + ': ' + _t.getTypeName(type)]);

      _t.fail(message());
    }
  } else if (!(x instanceof type)) {
    _t.fail(message());
  }

  return x;
}
//# sourceMappingURL=index.js.map