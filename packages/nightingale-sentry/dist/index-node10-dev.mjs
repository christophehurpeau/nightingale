import { withScope, init } from '@sentry/node';
import Level from 'nightingale-levels';

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
  init({
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
    withScope(scope => {
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

export default SentryHandler;
//# sourceMappingURL=index-node10-dev.mjs.map
