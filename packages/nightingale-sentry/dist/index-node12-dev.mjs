import * as SentryNode from '@sentry/node';
import { Severity } from '@sentry/types';
import Level from 'nightingale-levels';

const mapToSentryLevel = {
  [Level.TRACE]: Severity.Debug,
  [Level.DEBUG]: Severity.Debug,
  [Level.INFO]: Severity.Info,
  [Level.NOTICE]: Severity.Log,
  [Level.WARNING]: Severity.Warning,
  [Level.ERROR]: Severity.Error,
  [Level.CRITICAL]: Severity.Critical,
  [Level.FATAL]: Severity.Fatal,
  [Level.EMERGENCY]: Severity.Critical,
  // not a level
  [Level.ALL]: Severity.Error
};

const createHandler = (Sentry, {
  getUser = () => undefined,
  getTags = () => ({}),
  getBreadcrumbCategory = () => undefined,
  getBreadcrumbType = () => undefined,
  shouldSendAsException = record => {
    var _record$metadata;

    return ((_record$metadata = record.metadata) === null || _record$metadata === void 0 ? void 0 : _record$metadata.error) !== undefined && record.metadata.unhandled !== true;
  },
  shouldSendAsBreadcrumb = () => false
} = {}) => {
  return record => {
    const {
      key,
      level,
      metadata,
      extra
    } = record;

    if (shouldSendAsException(record)) {
      const error = (metadata === null || metadata === void 0 ? void 0 : metadata.error) || record.message;
      const extraData = { ...metadata,
        ...extra
      };
      delete extraData.error;
      Sentry.captureException(error, {
        level: mapToSentryLevel[level] || Severity.Error,
        user: getUser(record),
        tags: {
          loggerKey: key,
          ...getTags(record)
        },
        extra: extraData
      });
    } else if (shouldSendAsBreadcrumb(record)) {
      Sentry.addBreadcrumb({
        level: mapToSentryLevel[level] || Severity.Error,
        category: getBreadcrumbCategory(record),
        type: getBreadcrumbType(record),
        message: record.message,
        data: record.metadata,
        timestamp: record.datetime.getTime()
      });
    }
  };
};

class SentryHandler {
  constructor(Sentry, minLevel, options) {
    this.minLevel = minLevel;

    if (typeof Sentry === 'string') {
      console.warn('nightingale-sentry: Passing DSN directly is deprecated, pass Sentry instead and init in your app.');
      SentryNode.init({
        dsn: Sentry
      });
      this.handle = createHandler(SentryNode, options);
    } else {
      this.handle = createHandler(Sentry, options);
    }
  }

}

export default SentryHandler;
//# sourceMappingURL=index-node12-dev.mjs.map
