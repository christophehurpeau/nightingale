'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

const createHandler = (ravenUrl, { getUser = () => {}, getTags = () => {} } = {}) => {
  const ravenClient = new _raven.Client(ravenUrl);

  return record => {
    const { key, level, metadata, extra } = record;
    let error = metadata && metadata.error;

    if (!error) {
      return;
    }

    const extraData = Object.assign({}, metadata, { extra });
    delete extraData.error;

    if (error.originalError) {
      // error-processor
      extraData.parsedStack = error.stackTrace.toArray();
      error = error.originalError;
    }

    ravenClient.captureException(error, {
      logger: key,
      level: mapToSentryLevel[level] || 'error',
      extra: extraData,
      user: getUser(record),
      tags: getTags(record)
    });
  };
};

function SentryHandler(ravenUrl, minLevel, options) {
  this.minLevel = minLevel;
  this.handle = createHandler(ravenUrl, options);
}
//# sourceMappingURL=index.js.map