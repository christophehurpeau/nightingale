'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const SentryNode = require('@sentry/node');
const types = require('@sentry/types');
const nightingaleLevels = require('nightingale-levels');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      n[k] = e[k];
    });
  }
  n['default'] = e;
  return n;
}

const SentryNode__namespace = /*#__PURE__*/_interopNamespace(SentryNode);

const mapToSentryLevel = {
  [nightingaleLevels.Level.TRACE]: types.Severity.Debug,
  [nightingaleLevels.Level.DEBUG]: types.Severity.Debug,
  [nightingaleLevels.Level.INFO]: types.Severity.Info,
  [nightingaleLevels.Level.NOTICE]: types.Severity.Log,
  [nightingaleLevels.Level.WARNING]: types.Severity.Warning,
  [nightingaleLevels.Level.ERROR]: types.Severity.Error,
  [nightingaleLevels.Level.CRITICAL]: types.Severity.Critical,
  [nightingaleLevels.Level.FATAL]: types.Severity.Fatal,
  [nightingaleLevels.Level.EMERGENCY]: types.Severity.Critical,
  // not a level
  [nightingaleLevels.Level.ALL]: types.Severity.Error
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
        level: mapToSentryLevel[level] || types.Severity.Error,
        user: getUser(record),
        tags: {
          loggerKey: key,
          ...getTags(record)
        },
        extra: extraData
      });
    } else if (shouldSendAsBreadcrumb(record)) {
      Sentry.addBreadcrumb({
        level: mapToSentryLevel[level] || types.Severity.Error,
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
      SentryNode__namespace.init({
        dsn: Sentry
      });
      this.handle = createHandler(SentryNode__namespace, options);
    } else {
      this.handle = createHandler(Sentry, options);
    }
  }

}

exports['default'] = SentryHandler;
//# sourceMappingURL=index-node12.cjs.js.map
