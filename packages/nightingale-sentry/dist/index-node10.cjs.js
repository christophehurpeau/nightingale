'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var raven = require('raven');
var Level = _interopDefault(require('nightingale-levels'));

const mapToSentryLevel = {
  [Level.TRACE]: 'debug',
  [Level.DEBUG]: 'debug',
  [Level.INFO]: 'info',
  [Level.WARNING]: 'warning',
  [Level.ERROR]: 'error',
  [Level.FATAL]: 'fatal',
  [Level.EMERGENCY]: 'fatal'
};

const createHandler = (ravenUrl, {
  getUser = () => {},
  getTags = () => {},
  getReq = () => {}
} = {}) => {
  const ravenClient = new raven.Client(ravenUrl);
  return record => {
    const {
      key,
      level,
      metadata,
      extra
    } = record;
    const error = metadata && metadata.error;

    if (!error) {
      return;
    }

    const extraData = Object.assign({}, metadata, extra);
    delete extraData.error;
    ravenClient.captureException(error, {
      logger: key,
      // logger is not in CaptureOptions but should work: merged later. TODO check and make a PR
      level: mapToSentryLevel[level] || 'error',
      extra: extraData,
      user: getUser(record),
      tags: getTags(record),
      req: getReq(record)
    });
  };
};

class SentryHandler {
  constructor(ravenUrl, minLevel, options) {
    this.minLevel = void 0;
    this.handle = void 0;
    this.minLevel = minLevel;
    this.handle = createHandler(ravenUrl, options);
  }

}

exports.default = SentryHandler;
//# sourceMappingURL=index-node10.cjs.js.map
