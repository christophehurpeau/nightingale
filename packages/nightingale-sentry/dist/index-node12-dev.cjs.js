'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const node = require('@sentry/node');
const Level = require('nightingale-levels');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

const Level__default = /*#__PURE__*/_interopDefaultLegacy(Level);

const mapToSentryLevel = {
  [Level__default.TRACE]: 'debug',
  [Level__default.DEBUG]: 'debug',
  [Level__default.INFO]: 'info',
  [Level__default.NOTICE]: 'log',
  [Level__default.WARNING]: 'warning',
  [Level__default.ERROR]: 'error',
  [Level__default.CRITICAL]: 'critical',
  [Level__default.FATAL]: 'critical',
  [Level__default.EMERGENCY]: 'critical',
  // not a level
  [Level__default.ALL]: 'fatal'
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
    const error = metadata === null || metadata === void 0 ? void 0 : metadata.error;

    if (!error) {
      return;
    }

    const extraData = { ...metadata,
      ...extra
    };
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
//# sourceMappingURL=index-node12-dev.cjs.js.map
