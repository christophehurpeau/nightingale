'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = SentryHandler;

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _raven = require('raven');

var _nightingaleLevels = require('nightingale-levels');

var _nightingaleLevels2 = _interopRequireDefault(_nightingaleLevels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapToSentryLevel = {
  [_nightingaleLevels2.default.TRACE]: 'debug',
  [_nightingaleLevels2.default.DEBUG]: 'debug',
  [_nightingaleLevels2.default.INFO]: 'info',
  [_nightingaleLevels2.default.WARNING]: 'warning',
  [_nightingaleLevels2.default.ERROR]: 'error',
  [_nightingaleLevels2.default.FATAL]: 'fatal',
  [_nightingaleLevels2.default.EMERGENCY]: 'fatal'
};

const createHandler = (ravenUrl, { getUser = () => {}, getTags = () => {} } = {}) => {
  const ravenClient = new _raven.Client(ravenUrl);

  return record => {
    const { key, level, metadata, extra } = record;
    let error = metadata && metadata.error;

    if (!error) {
      return;
    }

    const extraData = _extends({}, metadata, { extra });
    delete extraData.error;

    if (error.originalError) {
      // error-processor
      extraData.parsedStack = error.stackTrace.toArray();
      error = error.originalError;
    }

    ravenClient.captureError(error, {
      logger: key,
      level: mapToSentryLevel[level] || 'error',
      extra: extraData,
      user: getUser(record),
      tags: getTags(record)
    });
  };
};

function SentryHandler(ravenUrl, minLevel, options) {
  _assert(ravenUrl, _tcombForked2.default.String, 'ravenUrl');

  _assert(minLevel, _tcombForked2.default.Number, 'minLevel');

  this.minLevel = minLevel;
  this.handle = createHandler(ravenUrl, options);
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