import { Level } from 'nightingale-levels';

const mapToSentryLevel = {
  [Level.TRACE]: 'debug',
  [Level.DEBUG]: 'debug',
  [Level.INFO]: 'info',
  [Level.NOTICE]: 'log',
  [Level.WARNING]: 'warning',
  [Level.ERROR]: 'error',
  [Level.CRITICAL]: 'fatal',
  [Level.FATAL]: 'fatal',
  [Level.EMERGENCY]: 'fatal',
  // not a level
  [Level.ALL]: 'error'
};
const createHandler = (Sentry, {
  getUser = () => undefined,
  getTags = () => ({}),
  getBreadcrumbCategory = () => undefined,
  getBreadcrumbType = () => undefined,
  shouldSendAsException = record => record.metadata?.error !== undefined && record.metadata.unhandled !== true,
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
      const error = metadata?.error || record.message;
      const extraData = {
        ...metadata,
        ...extra
      };
      delete extraData.error;
      Sentry.captureException(error, {
        level: mapToSentryLevel[level] || 'error',
        user: getUser(record),
        tags: {
          loggerKey: key,
          ...getTags(record)
        },
        extra: extraData
      });
    } else if (shouldSendAsBreadcrumb(record)) {
      Sentry.addBreadcrumb({
        level: mapToSentryLevel[level] || 'error',
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
    this.handle = createHandler(Sentry, options);
  }
}

export { SentryHandler };
//# sourceMappingURL=index-node16.mjs.map
