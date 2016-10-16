'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = SentryHandler;

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

const createHandler = ravenUrl => {
  const ravenClient = new _raven.Client(ravenUrl);

  return function write(_, _ref) {
    let level = _ref.level;
    let metadata = _ref.metadata;
    let extra = _ref.extra;

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
      level: mapToSentryLevel[level] || 'error',
      extra: extraData
    });
  };
};

function SentryHandler(ravenUrl, minLevel) {
  this.minLevel = minLevel;
  this.handle = createHandler(ravenUrl);
}
//# sourceMappingURL=index.js.map