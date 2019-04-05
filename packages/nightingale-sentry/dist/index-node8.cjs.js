'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const node = require('@sentry/node');
const Level = _interopDefault(require('nightingale-levels'));

const mapToSentryLevel = {
  [Level.TRACE]: 'debug',
  [Level.DEBUG]: 'debug',
  [Level.INFO]: 'info',
  [Level.NOTICE]: 'log',
  [Level.WARNING]: 'warning',
  [Level.ERROR]: 'error',
  [Level.CRITICAL]: 'critical',
  [Level.FATAL]: 'critical',
  [Level.EMERGENCY]: 'critical',
  // not a level
  [Level.ALL]: 'fatal'
};

const createHandler = (dsn, {
  getUser,
  getTags
} = {}) => {
  node.init({
    dsn
  });
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
    node.withScope(scope => {
      scope.setLevel(mapToSentryLevel[level] || 'error');
      scope.setTag('loggerKey', key);

      if (extraData) {
        Object.keys(extraData).forEach(key => {
          scope.setExtra(key, extraData[key]);
        });
      }

      if (getUser) {
        const user = getUser(record);
        if (user) scope.setUser(user);
      }

      if (getTags) {
        const tags = getTags(record);

        if (tags) {
          Object.keys(tags).forEach(key => {
            scope.setTag(key, tags[key]);
          });
        }
      }
    });
  };
};

class SentryHandler {
  constructor(ravenUrl, minLevel, options) {
    this.minLevel = minLevel;
    this.handle = createHandler(ravenUrl, options);
  }

}

exports.default = SentryHandler;
//# sourceMappingURL=index-node8.cjs.js.map
