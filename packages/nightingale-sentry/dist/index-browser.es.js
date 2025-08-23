import { Level } from 'nightingale-levels';

const mapToSentryLevel = {
  [Level.TRACE]: "debug",
  [Level.DEBUG]: "debug",
  [Level.INFO]: "info",
  [Level.NOTICE]: "log",
  [Level.WARNING]: "warning",
  [Level.ERROR]: "error",
  [Level.CRITICAL]: "fatal",
  [Level.FATAL]: "fatal",
  [Level.EMERGENCY]: "fatal",
  // not a level
  [Level.ALL]: "error"
};
const createHandler = (Sentry, {
  getUser = () => void 0,
  getTags = () => ({}),
  getBreadcrumbCategory = () => void 0,
  getBreadcrumbType = () => void 0,
  shouldSendAsException = (record) => record.metadata?.error !== void 0 && record.metadata.unhandled !== true,
  shouldSendAsBreadcrumb = (record) => false
} = {}) => {
  return (record) => {
    const { key, level, metadata, extra, message } = record;
    if (shouldSendAsException(record)) {
      const error = metadata?.error || record.message;
      const extraData = {
        nightingaleErrorMessage: message,
        ...metadata,
        ...extra
      };
      delete extraData.error;
      Sentry.captureException(error, {
        level: mapToSentryLevel[level] || "error",
        user: getUser(record),
        tags: {
          loggerKey: key,
          ...getTags(record)
        },
        extra: extraData
      });
    } else if (shouldSendAsBreadcrumb(record)) {
      Sentry.addBreadcrumb({
        level: mapToSentryLevel[level] || "error",
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
//# sourceMappingURL=index-browser.es.js.map
